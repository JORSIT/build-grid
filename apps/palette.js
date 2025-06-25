document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("palette-container");
  const button = document.getElementById("generate-btn");

  function generateColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
  }

  function renderPalette() {
    container.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const color = generateColor();
      const div = document.createElement("div");
      div.className = "palette-color";
      div.style.backgroundColor = color;
      div.title = color;
      container.appendChild(div);
    }
  }

  button.addEventListener("click", renderPalette);
});
