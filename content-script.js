chrome.runtime.sendMessage({ type: "getOptions" }, (response) => {
  if (response.data) {
    const urls = response.data.autoClearUrls.split("\n");
    const currentOrigin = window.location.origin;

    const format = (string) => string.trim().replace(/\/$/, "");

    const origin = urls.reduce((res, url) => {
      if (format(url) === format(currentOrigin)) {
        res = format(url);
      }
      return res;
    }, undefined);

    if (origin) {
      chrome.runtime.sendMessage({ type: "clearData", origin  }, (response) => {
        if (response.message) console.log(response.message);
      });
    }
  }
});
