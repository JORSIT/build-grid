document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('calc-display');
  let currentInput = '';

  document.getElementById('equals').addEventListener('click', () => {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
    } catch (e) {
      display.value = 'Error';
    }
  });

  document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    display.value = '';
  });

  document.querySelectorAll('.btn').forEach(button => {
    const value = button.dataset.value;
    if (value !== undefined) {
      button.addEventListener('click', () => {
        currentInput += value;
        display.value = currentInput;
      });
    }
  });
});
