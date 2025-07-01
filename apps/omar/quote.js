const quotes = [
  "Be yourself; everyone else is already taken. – Oscar Wilde",
  "In the middle of every difficulty lies opportunity. – Albert Einstein",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Do what you can, with what you have, where you are. – Theodore Roosevelt",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you’re halfway there. – Theodore Roosevelt",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "You miss 100% of the shots you don’t take. – Wayne Gretzky",
  "The best way to predict the future is to create it. – Peter Drucker",
  "Happiness is not something ready made. It comes from your own actions. – Dalai Lama"
];

let favoriteQuotes = [];
let lastDisplayedQuote = "";


function showNotification(message, type = "success", duration = 3000) {
  const existing = document.querySelector(".custom-notification");
  if (existing) existing.remove();

  const notif = document.createElement("div");
  notif.className = `custom-notification ${type}`;
  notif.innerText = message;

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "✖";
  closeBtn.className = "close-btn";
  closeBtn.onclick = () => notif.remove();

  notif.appendChild(closeBtn);
  
  document.body.insertBefore(notif, document.body.firstChild);

  setTimeout(() => {
    notif.remove();
  }, duration);
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteTextElement = document.getElementById('quote-omar-text');
  const selectedQuote = quotes[randomIndex];

  if (quoteTextElement) {
    quoteTextElement.innerText = selectedQuote;
    lastDisplayedQuote = selectedQuote;
  }
}

function copyQuoteToClipboard() {
  const quoteText = document.getElementById('quote-omar-text').innerText;
  navigator.clipboard.writeText(quoteText)
    .then(() => showNotification("✅ Quote copied to clipboard!", "success"))
    .catch(err => {
      showNotification("❌ Failed to copy quote.", "error");
      console.error(err);
    });
}

function saveCurrentQuote() {
  const currentQuote = document.getElementById('quote-omar-text').innerText;

  if (!favoriteQuotes.includes(currentQuote)) {
    favoriteQuotes.push(currentQuote);
    renderFavorites();
    showNotification("✅ Quote saved!", "success");
  } else {
    showNotification("⚠️ This quote is already saved.", "warning");
  }
}

function deleteFavorite(index) {
  favoriteQuotes.splice(index, 1);
  renderFavorites();
  showNotification("🗑️ Quote removed.", "success");
}

function renderFavorites() {
  const list = document.getElementById('favorites-omar-list');
  list.innerHTML = "";

  favoriteQuotes.forEach((quote, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = "10px";

    const text = document.createElement('span');
    text.innerText = quote;

    const delBtn = document.createElement('button');
    delBtn.innerText = "🗑 Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteFavorite(index);

    li.appendChild(text);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('new-quote-omar-btn')?.addEventListener('click', showRandomQuote);
  document.getElementById('copy-quote-omar-btn')?.addEventListener('click', copyQuoteToClipboard);
  document.getElementById('save-quote-omar-btn')?.addEventListener('click', saveCurrentQuote);
  showRandomQuote();
});
