document.addEventListener('DOMContentLoaded', () => {
  const paletteContainer = document.getElementById('palette-container');
  const generateBtn = document.getElementById('generate-palette');

  /**
   * توليد لون عشوائي بصيغة HEX
   * @returns {string} اللون بصيغة هكس
   */
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function renderPalette() {
    paletteContainer.innerHTML = ''; 

    for(let i = 0; i < 5; i++) {
      const color = getRandomColor();
      const colorDiv = document.createElement('div');
      colorDiv.className = 'color-swatch';
      colorDiv.style.backgroundColor = color;
      colorDiv.title = color; 
      paletteContainer.appendChild(colorDiv);
    }
  }
  generateBtn.addEventListener('click', renderPalette);
  renderPalette();
});
