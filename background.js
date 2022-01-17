chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "getOptions":
      chrome.storage.sync.get(null, async (result) => {
        const options = result[request.key] || result;
        sendResponse({ data: options });
      });
      break;

    case "clearData":
      var callback = function () {
        sendResponse({ message: "Site Data cleared." });
      };

      chrome.browsingData.remove(
        {
          origins: [request.origin],
        },
        {
          cacheStorage: true,
          cookies: true,
          fileSystems: true,
          indexedDB: true,
          localStorage: true,
          serviceWorkers: true,
          webSQL: true,
        },
        callback
      );
      break;
    default:
      break;
  }
  return true;
});
