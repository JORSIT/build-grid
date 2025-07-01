document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('calc-display');
  const buttonsContainer = document.getElementById('calc-buttons');

  let current = '';
  let resultDisplayed = false;

  const buttons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','=','+',
    'C', '⌫' // Replaced 'Reset' with '⌫'
  ];

  // Render calculator buttons
  function renderButtons() {
    buttonsContainer.innerHTML = ''; // Clear previous buttons
    buttons.forEach(label => {
      const btn = document.createElement('button');
      btn.innerText = label;
      btn.addEventListener('click', () => handleInput(label));
      buttonsContainer.appendChild(btn);
    });
  }

  // Handle button or key input
  function handleInput(input) {
    if (input === 'C') {
      current = '';
    } else if (input === '⌫') {
      current = current.slice(0, -1); // Backspace functionality
    } else if (input === '=') {
      // Prevent evaluating invalid expressions
      if (current === 'Error' || current === 'Cannot divide by zero') {
        return; // Do nothing
      }

      if (current.trim() === '') {
        current = '0';
      } else {
        try {
          const evalResult = eval(current);
          if (evalResult === Infinity || evalResult === -Infinity) {
            current = 'Cannot divide by zero';
          } else {
            current = evalResult.toString();
          }
        } catch (e) {
          current = 'Error';
        }
      }
      resultDisplayed = true;
    } else {
      // Clear error messages before continuing
      if (current === 'Error' || current === 'Cannot divide by zero') {
        current = '';
      }

      if (resultDisplayed && /[0-9]/.test(input)) {
        current = input;
      } else {
        current += input;
      }
      resultDisplayed = false;
    }
    display.innerText = typeof current === 'string' ? current : 'Error';
  }

  // Support keyboard input
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ([...buttons, 'Enter', 'Escape', 'Backspace'].includes(key)) {
      if (key === 'Enter') handleInput('=');
      else if (key === 'Escape') handleInput('C');
      else if (key === 'Backspace') handleInput('⌫');
      else handleInput(key);
    }
  });

  renderButtons();
});
