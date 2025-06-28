AppUtils.onClick('calculate-btn', function () 
{
  const dateInput = AppUtils.getValue('datetime-picker');
  const display = document.getElementById('countdown-display');

  if (!dateInput) {
    display.textContent = 'Please select a valid date and time.';
    return;
  }

  const targetTime = new Date(dateInput).getTime();

  if (isNaN(targetTime) || targetTime <= Date.now()) {
    display.textContent = 'Please choose a future date and time.';
    return;
  }

  // Clear any previous intervals
  if (window.timerInterval) clearInterval(window.timerInterval);

  window.timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      clearInterval(window.timerInterval);
      display.textContent = "Time's up!";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60));
    const remainingAfterYears = totalSeconds % Math.floor(365.25 * 24 * 60 * 60);
    const days = Math.floor(remainingAfterYears / (60 * 60 * 24));
    const hours = Math.floor((remainingAfterYears % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((remainingAfterYears % (60 * 60)) / 60);
    const seconds = remainingAfterYears % 60;


    display.textContent = `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;
  }, 1000);
});