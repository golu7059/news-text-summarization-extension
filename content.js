chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
      let articleText = window.getSelection().toString(); // Capture the selected text
      if (!articleText) {
          sendResponse({ summary: 'No text selected.' });
          return;
      }

      fetch('http://127.0.0.1:5007/summarize', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: articleText })
      })
      .then(response => response.json())
      .then(data => {
          sendResponse({ summary: data.summary });
      })
      .catch(error => {
          sendResponse({ summary: 'Error summarizing article.' });
      });

      return true; // Will respond asynchronously
  }
});