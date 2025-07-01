document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('generate-btn');
  const backButton = document.getElementById('back-button');

  btn.addEventListener('click', generatePalette);

  backButton.addEventListener('click', () => {
    AppUtils.hide('colorPicker-app');
    AppUtils.show('main-view');
  });

  generatePalette();
});

function generatePalette() {
  const container = document.getElementById('palette-container');
  container.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();

    const colorDiv = AppUtils.createElement('div', 'color-box');
    colorDiv.style.backgroundColor = color;

    const codeText = AppUtils.createElement('p', 'color-code', color);
    codeText.style.cursor = 'pointer';

    codeText.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        codeText.textContent = `${color} ✓`;
        setTimeout(() => {
          codeText.textContent = color;
        }, 1000);
      });
    });

    colorDiv.appendChild(codeText);
    container.appendChild(colorDiv);
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
