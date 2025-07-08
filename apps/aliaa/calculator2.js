document.querySelectorAll("#calculator-aliya-app .btn").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const displayId = "aliya-calc-display";
    const current = AppUtils.getValue(displayId);
    AppUtils.setValue(displayId, current + value);
  });
});

AppUtils.onClick("clear", () => {
  AppUtils.setValue("aliya-calc-display", "");
});

AppUtils.onClick("equals", () => {
  const expression = AppUtils.getValue("aliya-calc-display");
  try {
    const result = Function('"use strict"; return (' + expression + ')')();
    if (result === Infinity || result === -Infinity) {
      AppUtils.setValue("aliya-calc-display", "Cannot divide by zero");
    } else {
      AppUtils.setValue("aliya-calc-display", result);
    }
  } catch (e) {
    AppUtils.setValue("aliya-calc-display", "Error");
  }
});
