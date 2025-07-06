// apps/calculator.js

document.addEventListener('DOMContentLoaded', () => {
  let currentInput = '';
  let operator = '';
  let previousValue = '';
  const display = AppUtils.qs('#calculator-display');

  // Update the display
  function updateDisplay(value) {
    AppUtils.setValue(display, value);
  }

  // Clear all state
  function clearCalculator() {
    currentInput = '';
    operator = '';
    previousValue = '';
    updateDisplay('0');
  }

  // Handle digit input
  function inputDigit(digit) {
    currentInput += digit;
    updateDisplay(currentInput);
  }

  // Handle operator input
  function inputOperator(op) {
    if (currentInput === '') return;
    if (previousValue !== '') evaluate();
    operator = op;
    previousValue = currentInput;
    currentInput = '';
  }

  // Evaluate the current expression
  function evaluate() {
    if (currentInput === '' || previousValue === '' || operator === '') return;
    const a = parseFloat(previousValue);
    const b = parseFloat(currentInput);
    let result = 0;
    if (operator === '+') result = a + b;
    else if (operator === '-') result = a - b;
    else if (operator === '*') result = a * b;
    else if (operator === '/') result = b !== 0 ? a / b : 'Error';
    updateDisplay(result);
    currentInput = result.toString();
    operator = '';
    previousValue = '';
  }

  // Handle keypress (bonus)
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key)) inputDigit(key);
    else if (['+', '-', '*', '/'].includes(key)) inputOperator(key);
    else if (key === 'Enter') evaluate();
    else if (key === 'Escape') clearCalculator();
  });

  // Bind button events
  AppUtils.onClick('#calculator-clear', clearCalculator);
  AppUtils.qsa('.calculator-digit').forEach(btn =>
    AppUtils.onClick(btn, () => inputDigit(btn.dataset.digit))
  );
  AppUtils.qsa('.calculator-operator').forEach(btn =>
    AppUtils.onClick(btn, () => inputOperator(btn.dataset.op))
  );
  AppUtils.onClick('#calculator-equals', evaluate);
});
