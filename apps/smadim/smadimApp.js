const SmadimCalculator = (() => {
  const state = {
    current: '',
    previous: '',
    operation: null
  };

  function render() {
    const display = document.querySelector('#smadim-display');
    display.textContent = state.current || '0';
  }

  function clear() {
    state.current = '';
    state.previous = '';
    state.operation = null;
    render();
  }

  function appendNumber(num) {
    if (num === '.' && state.current.includes('.')) return;
    state.current += num;
    render();
  }

  function chooseOperation(op) {
    if (state.current === '') return;
    if (state.previous !== '') compute();
    state.operation = op;
    state.previous = state.current;
    state.current = '';
    render();
  }

  function compute() {
    const prev = parseFloat(state.previous);
    const current = parseFloat(state.current);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (state.operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '÷': result = current === 0 ? 'Err' : prev / current; break;
      default: return;
    }

    state.current = result.toString();
    state.operation = null;
    state.previous = '';
    render();
  }

  function bindEvents() {
    AppUtils.onClick('#smadim-app .num', (btn) => appendNumber(btn.dataset.num));
    AppUtils.onClick('#smadim-app .op', (btn) => chooseOperation(btn.dataset.op));
    AppUtils.onClick('#smadim-app .equals', () => compute());
    AppUtils.onClick('#smadim-app .clear', () => clear());
    AppUtils.onClick('#smadim-app .back-btn', () => showMain());
  }

  return {
    init() {
      bindEvents();
      render();
    }
  };
})();
