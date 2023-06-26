# Instructions:

First, you must build the project (`npx webpack`).

Then, open Google Chrome, go to the Extensions page (`chrome://extensions`), and enable "Developer mode".

Click on "Load unpacked extension" and navigate to the directory which houses this repo. The extension should now be loaded into Google Chrome, and you should be able to click on its icon in the toolbar to see your popup.

# Reflection:

Design decisions:
- If a user is visiting multiple tabs and wants to use the same API keys it would be time effective to save these keys thus I used local storage so that a user does not have to re-enter the information every time they open the popup. That being said, this is not the most secure method. However, since this Chrome extension is not being published and instead requires developer mode, it is an acceptable risk. A tech-savvy enough user who builds this repo and locally loads it into Google Chrome should also be savvy enough to clear API keys from their local storage (NOTE: if you decide to clone this repo and publish it, clean up that code...)

- I decided to POST to mem.ai's endpoint instead of using ` @mem-labs/mem-node`. This was because I wanted to evaluate the response code of the POST to display a success/error message. Similarly, I am also POSTing to OpenAI's endpoint instead of using `openai` which should be used on the server vs. client; using it on the client results in the code trying to set an "unsafe header 'User-Agent'".

Challenges encountered and how they were addressed:
- How to feed information from the webpage to the popup; I learned about message passing between Chrome extensions and the actual webpage being visited.
- Content Security Policy; My React code was being bundled in a way that Chrome did not like (use of `eval`). I could have reconfigured babel/webpack, instead I modified the manifest file. Similar to the above point about API keys being saved to local storage, this web extension is not ready for production and would require refactoring to make it more secure.

Future improvements:
- Currently, there is no feedback to the user when the requests to OpenAI and Mem are in progress. I would add a loading spinner to indicate that their request is in flight.

# Screenshots
- <img width="351" alt="popup" src="https://github.com/kmgehrma/mem.ai/assets/57041732/6b73b5be-4c69-447b-a379-66633d7d2c72">
- <img width="328" alt="success-message" src="https://github.com/kmgehrma/mem.ai/assets/57041732/6388b206-3b99-478f-a3eb-232f0da9590b">
- <img width="329" alt="error-message" src="https://github.com/kmgehrma/mem.ai/assets/57041732/9392dd21-2e11-4648-8a03-f2fb93f2f429">
- <img width="679" alt="example-created-mem-with-summary" src="https://github.com/kmgehrma/mem.ai/assets/57041732/3e5593cf-8ea0-4b94-81a1-4b8985936dbe">
