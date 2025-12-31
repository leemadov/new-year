let countdownInterval;
let timeOffset = 0;

// Fetch accurate time from API
async function syncTime() {
  try {
    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/Etc/GMT-2"
    );
    const data = await response.json();

    // API returns current UTC timestamp in seconds
    const apiTime = data.unixtime * 1000;

    // Calculate offset between API time and device time
    timeOffset = apiTime - Date.now();

    startCountdown();
  } catch (error) {
    console.error("Time sync failed:", error);
  }
}

// Jan 1, 2026 00:00 at UTC+2 → Dec 31, 2025 22:00 UTC
const countdownDate = new Date("2025-12-31T22:00:00Z").getTime();

function startCountdown() {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  // Use synced time instead of device time
  const now = Date.now() + timeOffset;
  const difference = countdownDate - now;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    document.body.classList.add("confetti-bg");
    document.getElementById("timer").innerText = "Happy New Year!";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  const pad = (n) => String(n).padStart(2, "0");

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = pad(hours);
  document.getElementById("minutes").innerText = pad(minutes);
  document.getElementById("seconds").innerText = pad(seconds);
}

// Start by syncing time
syncTime();
