// background.js
chrome.action.onClicked.addListener((tab) => {
    // Open the extension in a new tab
    chrome.tabs.create({ url: "index.html" });
  });