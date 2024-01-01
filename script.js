function updateCountdown() {
    const countdownDate = new Date("2024-01-01T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = countdownDate - now;
  
    if (difference <= 0) {
      clearInterval(countdownInterval);
      document.body.classList.add("confetti-bg");
      document.getElementById("timer").innerHTML = "Happy New Year!";
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;
    }
  }
  
  const countdownInterval = setInterval(updateCountdown, 1000);
  
