// ======= State =======
let targetDate = null;
let countdownInterval = null;

function showApp(appName)
 {
  document.querySelectorAll('.todo-app').forEach(app => {
    app.style.display = 'none';
  });
  document.getElementById('main-view').style.display = 'none';

  const appElement = document.getElementById(`${appName}-app`);
  if (appElement) {
    appElement.style.display = 'block';
  }
}

function showMain() {
  document.querySelectorAll('.todo-app').forEach(app => {
    app.style.display = 'none';
  });
  document.getElementById('main-view').style.display = 'block';
}

function showCountdownTimer() {
  document.querySelectorAll('.todo-app').forEach(app => {
    app.style.display = 'none';
  });
  document.getElementById('countdown-timer-app').style.display = 'block';
}



function calculateCountdown() {
  const input = document.getElementById('datetime-picker');
  const datetimeValue = input.value;

  if (!datetimeValue) {
    alert('Please select a valid date and time.');
    return;
  }

  const selectedDate = new Date(datetimeValue);

  if (selectedDate <= new Date()) {
    alert('Please select a future date and time.');
    return;
  }


  targetDate = selectedDate;


  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  updateCountdown(); 
  countdownInterval = setInterval(updateCountdown, 1000);
}


function updateCountdown() {
  if (!targetDate) return;

  const now = new Date();
  let diff = targetDate - now;

  const display = document.getElementById('countdown-display');

  if (diff <= 0) {
    clearInterval(countdownInterval);
    display.textContent = ' Countdown is over! ';
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


document.addEventListener('DOMContentLoaded', () => {
  const calcBtn = document.getElementById('calculate-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculateCountdown);
  }
});

