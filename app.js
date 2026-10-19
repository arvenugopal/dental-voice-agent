const VAPI_PUBLIC_KEY = "cb6b7ed1-86cb-4216-a877-72d4850125c0";
const ASSISTANT_ID = "127b92e3-e1a8-4ec7-a442-6e7903a0256e";

const vapi = new Vapi(VAPI_PUBLIC_KEY);

const callBtn = document.getElementById("call-btn");
const btnIcon = document.getElementById("btn-icon");
const btnLabel = document.getElementById("btn-label");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");

let isCallActive = false;

function toggleCall() {
  if (isCallActive) {
    vapi.stop();
  } else {
    statusDot.className = "dot connecting";
    statusText.textContent = "Connecting...";
    btnLabel.textContent = "Connecting...";
    callBtn.disabled = true;

    vapi.start(ASSISTANT_ID)
      .catch((err) => {
        console.error("Call failed to start:", err);
        resetUI();
      });
  }
}

vapi.on("call-start", () => {
  isCallActive = true;
  callBtn.disabled = false;
  callBtn.className = "btn btn-danger";
  btnIcon.textContent = "⏹️";
  btnLabel.textContent = "End Call";
  statusDot.className = "dot active";
  statusText.textContent = "Call in progress";
});

vapi.on("call-end", () => {
  resetUI();
});

vapi.on("error", (error) => {
  console.error("Vapi Error:", error);
  resetUI();
});

function resetUI() {
  isCallActive = false;
  callBtn.disabled = false;
  callBtn.className = "btn btn-primary";
  btnIcon.textContent = "🎙️";
  btnLabel.textContent = "Start Call";
  statusDot.className = "dot";
  statusText.textContent = "Ready to assist";
}
