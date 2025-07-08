document.addEventListener('DOMContentLoaded', () => {
  let currentInput = '';
  let operator = null;
  let operand = null;

  const display = document.getElementById('calc-display');
  const buttonsContainer = document.getElementById('calc-buttons');

  const buttons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','=','+',
    'C'
  ];

  // Render calculator buttons
  function renderButtons() {
    AppUtils.clear(buttonsContainer);
    buttons.forEach(text => {
      const btn = AppUtils.createElement('button', { text });
      AppUtils.onClick(btn, () => handleInput(text));
      buttonsContainer.appendChild(btn);
    });
  }

  // Update the display text
  function updateDisplay(value) {
    AppUtils.setValue(display, value);
  }

  // Handle input logic
  function handleInput(input) {
    if (!isNaN(input) || input === '.') {
      currentInput += input;
      updateDisplay(currentInput);
    } else if (['+', '-', '*', '/'].includes(input)) {
      if (currentInput === '') return;
      operand = parseFloat(currentInput);
      operator = input;
      currentInput = '';
    } else if (input === '=') {
      if (operator && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        const result = compute(operand, secondOperand, operator);
        currentInput = result.toString();
        operator = null;
        operand = null;
        updateDisplay(currentInput);
      }
    } else if (input === 'C') {
      currentInput = '';
      operator = null;
      operand = null;
      updateDisplay('0');
    }
  }

  // Perform the calculation
  function compute(a, b, op) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Err';
    }
  }

  // Handle keyboard input
  document.addEventListener('keydown', (e) => {
    const valid = [...'0123456789.+-*/='];
    if (valid.includes(e.key)) {
      handleInput(e.key);
    } else if (e.key === 'Enter') {
      handleInput('=');
    } else if (e.key === 'Escape') {
      handleInput('C');
    }
  });

  renderButtons();
});
