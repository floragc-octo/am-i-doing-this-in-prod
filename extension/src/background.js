// Open side panel when extension icon is clicked
// Compatible with both Chrome and Firefox
chrome.action.onClicked.addListener((tab) => {
  // Check if we're on Firefox (which uses browser namespace)
  if (typeof browser !== 'undefined' && browser.sidebarAction) {
    // Firefox: open sidebar
    browser.sidebarAction.open()
  } else if (chrome.sidePanel) {
    // Chrome/Edge: open side panel
    chrome.sidePanel.open({ windowId: tab.windowId })
  }
})
