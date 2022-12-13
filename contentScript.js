/**
* Background Scriptからのメッセージを受け取るためのリスナー
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  window.open(request)
});