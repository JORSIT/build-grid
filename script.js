// script.js

// —— Navigation between “hub” and apps ——
function showApp(appName) {
  AppUtils.hide('main-view');

  // اخفاء جميع التطبيقات
  const apps = document.querySelectorAll('.todo-app');
  apps.forEach(app => app.style.display = 'none');

  // عرض التطبيق المطلوب
  const appElement = document.getElementById(`${appName}-app`);
  if (appElement) {
    appElement.style.display = 'block';
  }
}
function showMain() {
  AppUtils.show('main-view');

  // إخفاء جميع التطبيقات
  const apps = document.querySelectorAll('.todo-app');
  apps.forEach(app => app.style.display = 'none');
}


/**
 * Utility for interns to register new apps.
 */
function addNewApp(appName, appHtml) {
    console.log(`Adding new app: ${appName}`);
    // Interns can hook into this to inject HTML, etc.
}

/**
 * General DOM helper methods.
 */
const AppUtils = {
  // Show an element by ID
  show: id => document.getElementById(id).style.display = 'block',

  // Hide an element by ID
  hide: id => document.getElementById(id).style.display = 'none',

  // Bind a click handler
  onClick: (id, fn) => document.getElementById(id).addEventListener('click', fn),

  // Get/set value helpers
  getValue: id => document.getElementById(id).value,
  setValue: (id, val) => { document.getElementById(id).value = val; },

  // Create a new element easily
  createElement: (tag, cls = '', html = '') => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  }
};