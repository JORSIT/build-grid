let totalBill = 0;
let tipPercent = 0;
let numberOfPeople = 1;

/**
 * Calculates and displays the amount each person should pay.
 */
function renderTipSplitter() {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;

  const tipAmount = totalBill * (tipPercent / 100);
  const totalWithTip = totalBill + tipAmount;
  const perPerson = numberOfPeople > 0 ? totalWithTip / numberOfPeople : 0;

  resultDiv.textContent = `Each person pays: $${perPerson.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const billInput = document.getElementById('bill-input');
  const tipInput = document.getElementById('tip-input');
  const peopleInput = document.getElementById('people-input');
  const resultDiv = document.getElementById('result');
  const resetBtn = document.getElementById("reset-btn");

  // ✅ Calculate button logic
  document.getElementById('calculate-btn').addEventListener('click', () => {
    totalBill = parseFloat(billInput.value) || 0;
    tipPercent = parseFloat(tipInput.value) || 0;
    numberOfPeople = parseInt(peopleInput.value) || 1;

    renderTipSplitter();
  });

  // ✅ Reset button logic
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      billInput.value = "";
      tipInput.value = "";
      peopleInput.value = "";
      resultDiv.innerHTML = "";
    });
  }

  // ✅ Support Enter key to trigger calculation
  ['bill-input', 'tip-input', 'people-input'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          document.getElementById('calculate-btn').click();
        }
      });
    }
  });

  // ✅ Hide Tip Splitter by default
  const tipApp = document.getElementById('tip-app');
  if (tipApp) tipApp.style.display = 'none';

  // ✅ Show Tip Splitter when its Launch button is clicked
  const launchButtons = document.querySelectorAll("button[onclick=\"showApp('tip')\"]");
  launchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (tipApp) tipApp.style.display = 'flex';
      const hub = document.getElementById('main-view');
      if (hub) hub.style.display = 'none';
    });
  });

  // ✅ Hide Tip Splitter and go back to Hub when Back button is clicked
  const backBtn = tipApp.querySelector('.back-button');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      tipApp.style.display = 'none';
      const hub = document.getElementById('main-view');
      if (hub) hub.style.display = 'block';
    });
  }
});
