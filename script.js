const AppUtils = {
  createElement(tag, props = {}, ...children) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (key === "className") el.className = value;
      else if (key.startsWith("on") && typeof value === "function") {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "style" && typeof value === "object") {
        Object.assign(el.style, value);
      } else {
        el.setAttribute(key, value);
      }
    }
    children.forEach(child => {
      if (typeof child === "string") el.appendChild(document.createTextNode(child));
      else if (child instanceof Node) el.appendChild(child);
    });
    return el;
  },
  setValue(element, value) {
    if ("value" in element) element.value = value;
    else element.textContent = value;
  },
  onClick(element, handler) {
    element.addEventListener("click", handler);
  }
};

// ===== التحكم بالتنقل بين الشاشات =====

/**
 * عرض تطبيق معين وإخفاء الشبكة الرئيسية
 * @param {string} appName - اسم التطبيق المراد عرضه
 */
function showApp(appName) {
  document.querySelectorAll(".todo-app").forEach(app => {
    app.style.display = "none";
  });
  const appDiv = document.getElementById(`${appName}-app`);
  if (appDiv) appDiv.style.display = "block";
  const appsGrid = document.querySelector(".apps-grid");
  if (appsGrid) appsGrid.style.display = "none";
}
function showMain() {
  document.querySelectorAll(".todo-app").forEach(app => {
    app.style.display = "none";
  });

  const appsGrid = document.querySelector(".apps-grid");
  if (appsGrid) appsGrid.style.display = "grid";
}

document.addEventListener("DOMContentLoaded", showMain);
