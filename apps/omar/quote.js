
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

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteTextElement = document.getElementById('quote-text');
  const selectedQuote = quotes[randomIndex];

  if (quoteTextElement) {
    quoteTextElement.innerText = selectedQuote;
    lastDisplayedQuote = selectedQuote;
  }
}

function copyQuoteToClipboard() {
  const quoteText = document.getElementById('quote-text').innerText;
  navigator.clipboard.writeText(quoteText)
    .then(() => {
      alert(" Quote copied to clipboard!");
    })
    .catch(err => {
      alert(" Failed to copy quote.");
      console.error(err);
    });
}

function saveCurrentQuote() {
  const currentQuote = document.getElementById('quote-text').innerText;

  if (!favoriteQuotes.includes(currentQuote)) {
    favoriteQuotes.push(currentQuote);
    renderFavorites();
  } else {
    alert(" This quote is already saved.");
  }
}

function deleteFavorite(index) {
  favoriteQuotes.splice(index, 1);
  renderFavorites();
}

function renderFavorites() {
  const list = document.getElementById('favorites-list');
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
  document.getElementById('new-quote-btn')?.addEventListener('click', showRandomQuote);
  document.getElementById('copy-quote-btn')?.addEventListener('click', copyQuoteToClipboard);
  document.getElementById('save-quote-btn')?.addEventListener('click', saveCurrentQuote);
  showRandomQuote();
});


