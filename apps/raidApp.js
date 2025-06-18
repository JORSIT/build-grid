document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('datetime-picker');
  const display = document.getElementById('countdown-display');
  let countdownInterval;

  window.calculateCountdown = function() {
    const datetimeValue = input.value;
    if (!datetimeValue) {
      alert('Please select a valid date and time.');
      return;
    }

    const targetDate = new Date(datetimeValue);
    if (targetDate <= new Date()) {
      alert('Please select a future date and time.');
      return;
    }

    if (countdownInterval) clearInterval(countdownInterval);

    function updateCountdown() {
      const now = new Date();
      let diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(countdownInterval);
        display.textContent = 'Countdown finished!';
        return;
      }

      let totalSeconds = Math.floor(diff / 1000);

      const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60));
      totalSeconds %= Math.floor(365.25 * 24 * 60 * 60);

      const months = Math.floor(totalSeconds / (30.44 * 24 * 60 * 60)); 
      totalSeconds %= Math.floor(30.44 * 24 * 60 * 60);

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      totalSeconds %= 24 * 60 * 60;

      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      display.textContent =
        `${years} year(s) - ${months} month(s) - ${days} day(s) - ` +
        `${hours} hour(s) - ${minutes} minute(s) - ${seconds} second(s)`;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  };
});
