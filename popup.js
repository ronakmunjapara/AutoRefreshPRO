// Access the input field and buttons
const intervalInput = document.getElementById("intervalInput");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

let refreshIntervalId; // Store the interval ID for later stopping

// Function to start the refresh cycle
function startRefresh() {
  const interval = parseInt(intervalInput.value);
  if (isNaN(interval) || interval <= 0) {
    // Handle invalid input
    alert("Please enter a valid positive interval.");
    return;
  }

  refreshIntervalId = setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  }, interval * 1000); // Convert seconds to milliseconds

  // Update UI elements to reflect the active state
  startButton.disabled = true;
  stopButton.disabled = false;
}

// Function to stop the refresh cycle
function stopRefresh() {
  clearInterval(refreshIntervalId);
  refreshIntervalId = null;

  // Update UI elements to reflect the inactive state
  startButton.disabled = false;
  stopButton.disabled = true;
}

// Event listeners for buttons
startButton.addEventListener("click", startRefresh);
stopButton.addEventListener("click", stopRefresh);
