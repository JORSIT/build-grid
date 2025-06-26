document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('generate-btn');
  btn.addEventListener('click', generatePalette); 
  generatePalette();
});
function generatePalette() {
  const container = document.getElementById('palette-container');
  container.innerHTML = ''; 

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor(); 
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-box';
    colorDiv.style.backgroundColor = color;
    const codeText = document.createElement('p');
    codeText.textContent = color;

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
function showMain() {
  alert("Back to main screen (placeholder)");
}


