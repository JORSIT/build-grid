// apps/randomquote.js

document.addEventListener('DOMContentLoaded', () => {
  // مصفوفة الاقتباسات
  const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don’t let yesterday take up too much of today.",
    "It’s not whether you get knocked down, it’s whether you get up.",
    "If you are working on something exciting, it will keep you motivated.",
    "Success is not in what you have, but who you are.",
    "Hard work beats talent when talent doesn’t work hard."
  ];

  const quoteTextEl = document.getElementById('quote-text');
  const btn = document.getElementById('get-quote-btn');

  // دالة لعرض اقتباس عشوائي
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteTextEl.textContent = quotes[randomIndex];
  }

  // ربط الزر بالدالة
  AppUtils.onClick(btn, showRandomQuote);
});
