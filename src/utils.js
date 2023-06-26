const createMem = async (url, title, notes, createSummary, html, openAI) => {
  let mem = `Title: ${title} \n URL: ${url} \n Notes: ${notes}`;
  let summary;
  if (createSummary) {
    const prompt = `Given the following input provide me a 100 word summary of the contents of the website: "${html}"`;

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAI}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 200,
          }),
        }
      );
      const gptResponse = await response.json();

      summary = gptResponse.choices[0].message.content;
    } catch (e) {
      return Promise.reject(e);
    }

    if (summary) {
      mem += `\n Summary: ${summary} \n`;
    }
  }
  return mem;
};

export default createMem;
