// apps/Yamen_Tahseen/quoteApp.js
// —— State & Data Model ——
let quoteAppInitialized = false;
let englishQuotes = [];
let arabicQuotes = [];
let quranverses = [];
let currenttype = 'english';
window.uiLang = 'en';

// —— Fallback Quotes ——
const fallbackEnglishQuotes = [
  { text: "The best way to get started is to quit talking and begin doing.", cred: "Walt Disney" },
  { text: "Success is not in what you have, but who you are.", cred: "Bo Bennett" },
  { text: "Dream bigger. Do bigger.", cred: "Unknown" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", cred: "Unknown" }
];

const fallbackArabicQuotes = [
  { text: "العقل زينة.", cred: "مثل عربي" },
  { text: "من جد وجد.", cred: "مثل عربي" },
  { text: "الصبر مفتاح الفرج.", cred: "مثل عربي" },
  { text: "العلم نور.", cred: "مثل عربي" }
];
const fallbackQuranVerses = [
  { text: "وَقُلْ رَبِّ زِدْنِي عِلْمًا", cred: "(114) سورة طه" },
  { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", cred: "(6) سورة الشرح" },
  { text: "وَلَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", cred: "(53) سورة الزمر" },
  { text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", cred: "(153) سورة البقرة" }
];

// —— API Endpoints ——
const API_ENDPOINTS = {
  english: 'https://random-quotes-freeapi.vercel.app/api/quotes',
  arabic: 'https://datasets-server.huggingface.co/rows?dataset=HeshamHaroon%2Farabic-quotes&config=default&split=train',
  quran: 'https://api.alquran.cloud/v1/ayah/all/ar.alafasy'
};

// —— Core Functions ——
//fetching quotes from APIs
async function fetchEnglishQuotes() {
  try {
    AppUtils.show('loader');
    const response = await fetch(API_ENDPOINTS.english);
    const data = await response.json();
    
    // Transform API response
    englishQuotes = data.map(item => ({
      text: item.quote,
      cred: item.author
    }));
    
    if (!englishQuotes.length) throw new Error('Empty API response');
    console.log(`Loaded ${englishQuotes.length} English quotes`);
  } catch (error) {
    console.error('Error loading English quotes:', error);
    englishQuotes = fallbackEnglishQuotes;
    showError('Failed to load English quotes from API. Showing fallback quotes.');
  }
}

async function fetchArabicQuotes() {
  try {
    AppUtils.show('loader');
    const response = await fetch(API_ENDPOINTS.arabic);
    const data = await response.json();
    
    // Transform Hugging Face response
    arabicQuotes = data.rows.map(row => ({
      text: row.row.quote,
      cred: row.row.author || 'Unknown'
    }));
    
    if (!arabicQuotes.length) throw new Error('Empty API response');
    console.log(`Loaded ${arabicQuotes.length} Arabic quotes`);
  } catch (error) {
    console.error('Error loading Arabic quotes:', error);
    arabicQuotes = fallbackArabicQuotes;
    showError('Failed to load Arabic quotes from API. Showing fallback quotes.');
  }
}
async function fetchQuranVerses() {
  try {
    AppUtils.show('loader');
    const response = await fetch(API_ENDPOINTS.quran);
    const data = await response.json();

    quranverses = Object.values(data.data).map(ayah => ({
      text: ayah.text,
      cred: `${ayah.surah.name} (${ayah.numberInSurah})`
    }));

    if (!quranverses.length) throw new Error('Empty API response');
    console.log(`Loaded ${quranverses.length} Quran verses`);
  } catch (error) {
    console.error('Error loading Quran verses:', error);
    quranverses = fallbackQuranVerses;
    showError('Failed to load Quran verses from API. Showing fallback verses.');
  }
}
// —— Quote Rendering Logic ——
// This function randomly selects a quote based on the current type
function getRandomQuote(type) {
  const quotes = type === 'arabic' ? arabicQuotes : type === 'english' ? englishQuotes : quranverses;

  if (quotes.length === 0) {
    showError(`No ${type} quotes loaded. Please try again.`);
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
// This function renders the quote in the UI
function renderQuote() {
  const labelMap = {
  english: 'English Quote',
  arabic: 'اقتباس عربي',
  quran: 'آية من القرآن الكريم'
 };
  AppUtils.hide('loader');
  
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const typeIndicator = document.getElementById('type-indicator');

  const quote = getRandomQuote(currenttype);
  if (!quote) return;
  
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = `— ${quote.cred}`;
  typeIndicator.textContent = labelMap[currenttype];

  // Apply Arabic styling
  quoteText.className = currenttype === 'arabic' || currenttype === 'quran' ? 'arabic' : '';
}

function showError(message) {
  AppUtils.hide('loader');
  document.getElementById('quote-text').textContent = message;
  document.getElementById('quote-author').textContent = '';
}
// —— Event Handlers ——
function handleEnglishClick() {
  currenttype = 'english';
  
  if (englishQuotes.length > 0) {
    renderQuote();
  } else {
    fetchEnglishQuotes().then(renderQuote);
  }
}

function handleArabicClick() {
  currenttype = 'arabic';

  if (arabicQuotes.length > 0) {
    renderQuote();
  } else {
    fetchArabicQuotes().then(renderQuote);
  }
}

function handleQuranClick() {
  currenttype = 'quran';
  if (quranverses.length > 0) {
    renderQuote();
  } else {
    fetchQuranVerses().then(renderQuote);
  }
}
// —— UI interaction Logic ——
// This function shows a toast notification when a quote is copied
function showCopiedToast() {
  const toast = document.createElement('div');
  toast.textContent = "📋 Quote copied!";
  toast.style.cssText = `
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: #4f46e5;
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    font-size: 0.95rem;
    z-index: 1000;
    transition: opacity 0.3s;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 300);
  }, 1500);
}

function copyQuote() {
  const text = document.getElementById('quote-text').textContent;
  const author = document.getElementById('quote-author').textContent;
  const full = `${text}\n${author}`;
  navigator.clipboard.writeText(full).then(showCopiedToast);
}
// —— UI Texts ——
// This object holds all UI texts for different languages
const uiText = {
  en: {
    englishBtn: "🔤 English Quotes",
    arabicBtn: "🌐 Arabic Quotes",
    quranBtn: "📖 Qur’an Verses",
    copyBtn: "📋 Copy Quote",
    heading: "Random Quote Generator",
    subheading: "Get inspired with uplifting quotes in English and Arabic."
  },
  ar: {
    englishBtn: "🔤 اقتباسات إنجليزية",
    arabicBtn: "🌐 اقتباسات عربية",
    quranBtn: "📖 آيات من القرآن",
    copyBtn: "📋 نسخ الاقتباس",
    heading: "مولّد الاقتباسات",
    subheading: "استلهم من الاقتباسات الملهمة باللغة الإنجليزية والعربية."
  }
};
// —— Language Switching Logic ——
// This function switches the UI language and updates all texts accordingly
function switchUILang(lang) {
  window.uiLang = lang;
  document.getElementById('english-btn').textContent = uiText[lang].englishBtn;
  document.getElementById('arabic-btn').textContent = uiText[lang].arabicBtn;
  document.getElementById('quran-btn').textContent = uiText[lang].quranBtn;
  document.getElementById('copy-btn').textContent = uiText[lang].copyBtn;
  document.getElementById('quote-heading').textContent = uiText[lang].heading;
  document.getElementById('quote-subheading').textContent = uiText[lang].subheading;
}
// —— Initialization Logic ——
// This function initializes the app and sets up event listeners
function initQuoteApp() {
  if (quoteAppInitialized) return;
  quoteAppInitialized = true;

  // Fetch data only once
  if (englishQuotes.length === 0) fetchEnglishQuotes().then(renderQuote);
  if (arabicQuotes.length === 0) fetchArabicQuotes();
  if (quranverses.length === 0) fetchQuranVerses();
}
const observer = new MutationObserver(() => {
  const isActive = document.getElementById("quote-app")?.classList.contains("active");
  if (isActive) {
    initQuoteApp();
    observer.disconnect();
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById("quote-app");
  if (app) {
    observer.observe(app, { attributes: true, attributeFilter: ['class'] });

    // Wire up event handlers
    AppUtils.onClick('english-btn', handleEnglishClick);
    AppUtils.onClick('arabic-btn', handleArabicClick);
    AppUtils.onClick('quran-btn', handleQuranClick);
    AppUtils.onClick('copy-btn', copyQuote);
  }
});