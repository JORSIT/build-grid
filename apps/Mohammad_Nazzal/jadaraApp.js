// jadaraApp.js – Jadara University Weather Status App
// Author: Mohammad Nazzal
// Last updated: 2025-06-28 (Bug fixes + clean rendering)

const COORDS = { lat: 32.422398, lon: 35.947281 }; // Jadara (Irbid)
const AUTO_REFRESH_MIN = 15;
let weather = null;
let refreshTimer = null;

const WEATHER_CODE = {
  0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
  45: 'fog', 48: 'depositing rime fog',
  51: 'light drizzle', 53: 'moderate drizzle', 55: 'dense drizzle',
  56: 'light freezing drizzle', 57: 'dense freezing drizzle',
  61: 'slight rain', 63: 'moderate rain', 65: 'heavy rain',
  66: 'light freezing rain', 67: 'heavy freezing rain',
  71: 'slight snow', 73: 'moderate snow', 75: 'heavy snow',
  80: 'rain showers (slight)', 81: 'rain showers (moderate)', 82: 'rain showers (violent)',
  95: 'thunderstorm', 96: 'thunderstorm & hail', 99: 'heavy thunderstorm & hail'
};

const ICON_CLASS = {
  sun: [0, 1],
  cloud: [2, 3],
  smog: [45, 48],
  showers: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75],
  bolt: [95, 96, 99]
};

function codeToIcon(code) {
  for (const [fa, list] of Object.entries(ICON_CLASS)) {
    if (list.includes(code)) {
      return fa === 'showers' ? 'cloud-showers-heavy' : fa;
    }
  }
  return 'sun';
}

function renderWeather() {
  const container = document.getElementById('weather-body');
  if (!container) return;

  container.innerHTML = weather ? `
    <div class="weather-app"> 
      <div class="weather-card">
        <div class="weather-left">
          <div class="weather-icon">
            <i class="fa-solid fa-${codeToIcon(weather.code)}"></i>
          </div>
          <div class="weather-info">
            <div class="temp">${weather.temp}°C</div>
            <div class="desc">${WEATHER_CODE[weather.code]}</div>
            <div class="wind">Wind ${weather.wind} m/s</div>
          </div>
        </div>
        <div class="weather-image"></div>
      </div>
    </div>
  ` : '<p>No data available</p>';

  const updated = document.getElementById('weather-updated');
  if (updated) {
    updated.textContent = `Last updated: ${new Date(weather?.time || Date.now()).toLocaleString()}`;
  }

  // Set background
  const hour = new Date(weather.time).getHours();
  const backgroundImage = (hour >= 18 || hour < 6)
    ? "url('../build-grid/apps/Mohammad_Nazzal/images/JadaraNight.png')"
    : "url('../build-grid/apps/Mohammad_Nazzal/images/JadaraMorning.png')";

  const appContainer = document.querySelector('.jadara-app');
  if (appContainer) {
    appContainer.style.backgroundImage = backgroundImage;
    appContainer.style.backgroundRepeat = 'no-repeat';
    appContainer.style.backgroundSize = 'cover';
  }
}

async function fetchWeather() {
  const updated = document.getElementById('weather-updated');
  if (updated) updated.textContent = 'Updating…';

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${COORDS.lat}&longitude=${COORDS.lon}&current_weather=true&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();
    const cw = data.current_weather;

    weather = {
      temp: cw.temperature,
      wind: cw.windspeed,
      code: cw.weathercode,
      time: cw.time
    };

    renderWeather();
  } catch (err) {
    console.error('Weather fetch failed:', err);
    if (updated) updated.textContent = 'Failed to load.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('weather-refresh')?.addEventListener('click', fetchWeather);

  fetchWeather();
  refreshTimer = setInterval(fetchWeather, AUTO_REFRESH_MIN * 60 * 1000);

  if (typeof addNewApp === 'function') {
    addNewApp('Jadara Weather Status', 'Weather loaded');
  }
});