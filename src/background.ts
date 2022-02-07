chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    var host, userID
    userID = GetUserId()
    if (tab.url != null && userID != null && tab.id) {
      host = new URL(tab.url).hostname
      if (host == "kommunity.com") {
        //alert("community")
        
      }

      //chrome.tabs.executeScript({file: './foreground.js'})
      //console.log(host + "   UserID: " + userID);
    }
  });
});
chrome.tabs.executeScript({file: './foreground.js'})

function GetUserId() {
  const userIdStr = localStorage.getItem("user_id")
  if (userIdStr != null) {
    return parseInt(userIdStr)
  }
  return null
}
