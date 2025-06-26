// —— State ——
const randomQuotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Dream big and dare to fail.",
  "Stay hungry. Stay foolish.",
  "Success is not in what you have, but who you are.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it’s done."
];

// —— DOM Injection ——
document.addEventListener("DOMContentLoaded", () => {
  const container = AppUtils.createElement("div");
  container.id = "randomQuotes-app";
  container.className = "todo-app";
  container.innerHTML = `
    <button class="back-button" onclick="showMain()">← Back to Hub</button>
    <div class="todo-header">
      <h2>Random Quote Generator</h2>
      <p>Click the button to discover a new quote</p>
    </div>
    <div class="quote-center">
      <button class="app-button" onclick="generateQuote()">Get Quote</button>
      <p id="quote-output" class="quote-box"></p>
    </div>
  `;
  document.body.appendChild(container);
});

// —— Quote Logic ——
function generateQuote() {
  const output = document.getElementById("quote-output");
  const index = Math.floor(Math.random() * randomQuotes.length);
  output.textContent = randomQuotes[index];
}