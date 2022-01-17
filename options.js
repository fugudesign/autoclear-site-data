// Saves options to chrome.storage
const save_options = () => {
  var urls = document.getElementById("urls").value;

  chrome.storage.sync.set(
    {
      autoClearUrls: urls,
    },
    () => {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 1200);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restore_options = () => {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(["autoClearUrls"], (result) => {
    document.getElementById("urls").value = result.autoClearUrls || "";
  });
}


document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
