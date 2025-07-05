// —— Data ——
const randomQuotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Stay hungry. Stay foolish.",
  "Dream big and dare to fail.",
  "Success is not in what you have, but who you are.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it’s done."
];

// —— Quote Logic ——
function generateQuote() {
  const output = document.getElementById("quote-output");
  const index = Math.floor(Math.random() * randomQuotes.length);
  output.textContent = randomQuotes[index];
}

// Bind event after page is ready
document.addEventListener("DOMContentLoaded", () => {
  AppUtils.onClick("quote-btn", generateQuote);
});