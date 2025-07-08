document.querySelectorAll("#calculator-aliya-app .btn").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const display = document.getElementById("aliya-calc-display");
    display.value += value;
  });
});

document.getElementById("clear").addEventListener("click", () => {
  document.getElementById("aliya-calc-display").value = "";
});

document.getElementById("equals").addEventListener("click", () => {
  const display = document.getElementById("aliya-calc-display");
  try {
    const result = eval(display.value);
    if (result === Infinity || result === -Infinity) {
      display.value = "Cannot divide by zero";
    } else {
      display.value = result;
    }
  } catch (e) {
    display.value = "Error";
  }
});
