// quote-generator.js
// Developed by Abdelghani Al-Ghoul

const quotes = [ // Array of quotes to pick from
  "The best way to get started is to quit talking and begin doing. - Walt Disney",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
  "If you are working on something exciting, it will keep you motivated. - Unknown",
  "Success is not in what you have, but who you are. - Bo Bennett"
];

function showMain() { // Show main hub and hide apps
  AppUtils.hide('raid-app');
  AppUtils.hide('quote-generator-app');
  AppUtils.show('main-view');
}

function generateQuote() { // Pick random quote and display it
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote-container').innerText = quote;
}

document.addEventListener('DOMContentLoaded', () => // Bind button click after DOM loads
  AppUtils.onClick('generate-quote', generateQuote)
);
