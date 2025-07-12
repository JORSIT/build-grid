document.addEventListener("DOMContentLoaded", () => {
    const quotes = [
        "Believe in yourself and all that you are.",
        "You are stronger than you think.",
        "Push yourself, because no one else is going to do it for you.",
        "Success doesn’t just find you. You have to go out and get it.",
        "The harder you work for something, the greater you’ll feel when you achieve it."
    ];

    const quoteText = document.getElementById("qais-quote-text");
    const newQuoteBtn = document.getElementById("qais-new-quote-btn");
    const copyBtn = document.getElementById("qais-copy-quote-btn");
    const saveBtn = document.getElementById("qais-save-quote-btn");
    const favoritesList = document.getElementById("qais-favorites-list");

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = quotes[randomIndex];
    }

    newQuoteBtn.addEventListener("click", showRandomQuote);

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(quoteText.textContent);
        alert("Copied to clipboard!");
    });

    
    saveBtn.addEventListener("click", () => {
        const li = document.createElement("li");
        li.textContent = quoteText.textContent;
        favoritesList.appendChild(li);
    });
});
