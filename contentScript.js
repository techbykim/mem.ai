chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getDOM') {
    sendResponse(document.body.innerText);
    return true;
  }
});
