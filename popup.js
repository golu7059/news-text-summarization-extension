document.addEventListener('DOMContentLoaded', function() {
  const summarizeButton = document.getElementById('summarize');
  const resultDiv = document.getElementById('summary');

  summarizeButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'summarize' }, function(response) {
              if (response) {
                  resultDiv.textContent = response.summary;
              } else {
                  resultDiv.textContent = 'Error summarizing article.';
              }
          });
      });
  });
});
