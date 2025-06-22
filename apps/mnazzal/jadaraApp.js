//
// jadaraApp.js – Jadara University Weather Status App
// Author: Mohammad Nazzal
//
//
// Last Updated: 6/22/2025

// Initialize the app states
let weather = null; // holds the latest observation
const COORDS = { lat: 32.422398, lon: 35.947281 }; // Jadara (Irbid)
const AUTO_REFRESH_MIN = 15; // how often to refresh automatically in minutes
let refreshTimer = null;

// Description of weather codes (from Open-Meteo API docs):
const WEATHER_CODE = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
  61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  66: 'Light freezing rain', 67: 'Heavy freezing rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
  80: 'Rain showers (slight)', 81: 'Rain showers (moderate)', 82: 'Rain showers (violent)',
  95: 'Thunderstorm', 96: 'Thunderstorm & hail', 99: 'Heavy thunderstorm & hail'
};

const describe = code => WEATHER_CODE[code] ?? `Code ${code}`;

const ICONS_DIR = 'apps/mnazzal/icons/';     // <── adjust once here if you move the folder

// Build full icon path in one place
const icon = name => `${ICONS_DIR}${name}.png`;

// Loading css
function loadCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'apps/mnazzal/jadara.css'; // adjust path if needed
  document.head.appendChild(link);
}

// Map Open-Meteo weather codes → icon path
function getWeatherIconPath(code) {
  if ([0, 1].includes(code)) return icon('sun');                 // clear / mainly clear
  if ([2, 3].includes(code)) return icon('cloudy');              // partly / overcast
  if ([45, 48].includes(code)) return icon('fog');               // fog
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return icon('rain');                                         // any drizzle / rain
  if ([71, 73, 75].includes(code)) return icon('snowflake');     // snow
  if ([95, 96, 99].includes(code)) return icon('thunderstorm');  // thunder
  return icon('sun');                                            // fallback
}

// DOM Construction & Rendering
function injectContainer() {
  if (document.getElementById('jadara-app')) return;

  const container = AppUtils.createElement('div', 'todo-app');
  container.id = 'jadara-app';
  container.innerHTML = `
    <button class="back-button" onclick="showMain()">← Back to Hub</button>
    <div class="weather-header">
      <h2>Jadara University Weather Status</h2>
      <p id="weather-updated">Loading…</p>
    </div>
    <div id="weather-body" class="weather-body"></div>
    <button id="weather-refresh" class="refresh-button">Refresh ↻</button>
  `;
  document.body.appendChild(container);
}

// Render Function
function render() {
  const body = document.getElementById('weather-body');
  if (!body) return;
  body.innerHTML = '';

  if (!weather) {
    body.appendChild(AppUtils.createElement('p', '', 'No data available'));
    return;
  }

  const iconPath = getWeatherIconPath(weather.code);

  const card = AppUtils.createElement(
    'div',
    'weather-card two-column',
    `
      <div class="weather-icon">
        <img src="${iconPath}" alt="weather icon" width="80" height="80">
      </div>
      <div class="weather-info">
        <div class="temp">${weather.temp}°C</div>
        <div class="desc">${weather.desc}</div>
        <div class="wind">Wind ${weather.wind} m/s</div>
      </div>
    `
  );

  body.appendChild(card);

  const ts = document.getElementById('weather-updated');
  if (ts) ts.textContent = `Last updated: ${new Date(weather.time).toLocaleString()}`;
}

// API Fetching from api.open-meteo.com
async function fetchWeather() {
  const ts = document.getElementById('weather-updated');
  if (ts) ts.textContent = 'Updating…';
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${COORDS.lat}&longitude=${COORDS.lon}&current_weather=true&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    const cw = data.current_weather;
    weather = {
      temp: cw.temperature,
      wind: cw.windspeed,
      desc: describe(cw.weathercode),
      code: cw.weathercode,
      time: cw.time
    };
    render();
  } catch (err) {
    console.error(err);
    if (ts) ts.textContent = 'Failed to load.';
  }
}

// Auto refresh weather status every AUTO_REFRESH_MIN minutes
function startAutoRefresh() {
  clearInterval(refreshTimer);
  refreshTimer = setInterval(fetchWeather, AUTO_REFRESH_MIN * 60 * 1000);
}

// Bootstraping
document.addEventListener('DOMContentLoaded', () => {
  loadCSS();
  injectContainer();
  AppUtils.onClick('weather-refresh', fetchWeather);

  const cardBtn = Array.from(document.querySelectorAll('.app-card'))
    .find(card => card.querySelector('.app-name')?.textContent.trim() === 'Jadara Weather Status')
    ?.querySelector('.app-button');

  if (cardBtn) cardBtn.onclick = () => showApp('jadara');

  fetchWeather();
  startAutoRefresh();

  if (typeof addNewApp === 'function') {
    addNewApp('Jadara Weather Status', 'Weather loaded');
  }
});

