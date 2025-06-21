
let totalBill = 0;
let tipPercent = 0;
let numberOfPeople = 1;
/**
 * Calculates the tip amount, total with tip, and how much each person should pay,
 * then updates the result div with this information.
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
 
//attach click event to the calculate buttn
  
  AppUtils.onClick('calculate-btn', () => {
        // Get the input elements for bill, tip percent, and number of people

    const billInput = document.getElementById('bill-input');
    const tipInput = document.getElementById('tip-input');
    const peopleInput = document.getElementById('people-input');
      // Parse and update the global variables with user input values
    totalBill = parseFloat(billInput.value) || 0;
    tipPercent = parseFloat(tipInput.value) || 0;
    numberOfPeople = parseInt(peopleInput.value) || 1;
    // Call function to calculate and render the tip splitter result
    renderTipSplitter();

  });

  // Support pressing Enter inside any of the input fields to trigger calculation
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
}); 
