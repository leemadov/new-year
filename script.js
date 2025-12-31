// Jan 1, 2026 00:00:00 at UTC+2
const countdownDate = new Date("2025-12-31T22:00:00Z").getTime();

function updateCountdown() {
  const now = Date.now();
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

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
