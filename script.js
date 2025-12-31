let countdownInterval;
let timeOffset = 0;

// Jan 1, 2026 00:00 at UTC+2
// = Dec 31, 2025 22:00 UTC
const countdownDate = Date.parse("2025-12-31T22:00:00Z");

function syncTime() {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", "https://www.google.com", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const dateHeader = xhr.getResponseHeader("Date");

      if (dateHeader) {
        const serverTime = new Date(dateHeader).getTime();
        timeOffset = serverTime - Date.now();
        startCountdown();
      } else {
        console.error("No Date header — fallback");
        startCountdown(); // fallback to device time
      }
    }
  };

  xhr.onerror = function () {
    console.error("Network error");
    startCountdown(); // fallback
  };

  xhr.send();
}

function startCountdown() {
  if (countdownInterval) return;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = Date.now() + timeOffset;
  const diff = countdownDate - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    document.body.classList.add("confetti-bg");
    document.getElementById("timer").innerText = "Happy New Year!";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

// START
syncTime();
