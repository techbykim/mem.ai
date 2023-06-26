import React, { useState, useEffect } from 'react';
import createMem from './utils.js'

const Form = ({setMessage}) => {

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [websiteContents, setWebsiteContents] = useState('');
  const [memApiAccessToken, setMemApiAccessToken] = useState('');
  const [notes, setNotes] = useState('');
  const [summaryEnabled, setSummaryEnabled] = useState(false);
  const [openAI, setOpenAI] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if(tabs && tabs[0]) {
        setUrl(tabs[0].url);
        setTitle(tabs[0].title);
        chrome.tabs.sendMessage(
          tabs[0].id,
          { message: 'getDOM' },
          (response) => {
            if(response) {
              setWebsiteContents(response);
            }
          }
        );
      }
    });
  
    chrome.storage.local.get(['mem'], (result) => {
      if (result && result.mem) {
        setMemApiAccessToken(result.mem);
      }
    });
  
    chrome.storage.local.get(['openAI'], (result) => {
      if (result && result.openAI) {
        setOpenAI(result.openAI);
      }
    });
  }, []);
  

  const handleSave = async () => {

    chrome.storage.local.set({ mem: memApiAccessToken }, () => {});
    chrome.storage.local.set({ openAI }, () => {});

    let formattedMem;
    try {
      formattedMem = await createMem(url, title, notes, summaryEnabled, websiteContents, openAI);
    } catch (e) {
      setMessage(e.toString());
      return;
    }

    const response = await fetch('https://api.mem.ai/v0/mems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiAccessToken ${memApiAccessToken}`
      },
      body: JSON.stringify({
        content: formattedMem,
      }),
    });
  
    const responseData = await response.json();
  
    if (response.ok) {
      setMessage('Your mem was successfully created!');
    } else {
      setMessage(`Error creating mem: ${responseData.error}`);
    }
  };

  return (
    <div>
      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="text"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title} 
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="mem">mem API Key</label>
      <input
        id="mem"
        type="text"
        value={memApiAccessToken}
        onChange={(e) => {
          setMemApiAccessToken(e.target.value);
        }}
        required
      />
      <label htmlFor="notes">Notes</label>
      <input
        id="notes"
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="summaryContainer">
        <label htmlFor="summary">Generate Summary</label>
        <input
          id="summary"
          type="checkbox"
          checked={summaryEnabled}
          onChange={(e) => setSummaryEnabled(e.target.checked)}
        />
      </div>
      {summaryEnabled && (
        <>
          <label htmlFor="openAI">OpenAI API Key</label>
          <input
            id="openAI"
            type="text"
            value={openAI}
            onChange={(e) => setOpenAI(e.target.value)}
          />
        </>
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );

}

export default Form;