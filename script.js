const AppUtils = {
  showElement: (id) => document.getElementById(id).classList.remove('hidden'),
  hideElement: (id) => document.getElementById(id).classList.add('hidden'),
};

function showApp(appName) {
  AppUtils.hideElement('palette-app'); // اخفي كل التطبيقات
  AppUtils.showElement(`${appName}-app`);
}

function showMain() {
  AppUtils.hideElement('palette-app');
}
