// Yazan Alqasem
// Run Python code in your browser using WebAssembly
/**
 * With limited power comes creatively limited responsibility.
 * Since I'm only allowed to edit this file and use plain JavaScript (no Tailwind, TypeScript, or React),
 * I had to get crafty — including injecting CDNs directly from here.
 *
 * That said, I hope you enjoy my little mini-app!
 */

// —— Globals & State ——
let pyodide = null;
let pyodideLoading = true;
let installedPackages = new Set();
const pyodideCDN = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full";
const outputMessages = {
  loadingPyodide: "Loading WebAssembly Pyodide modules...",
  pyodideLoaded: "WebAssembly loaded successfully! Ready to run code.",
  pyodideError: (error) => `Failed to load Pyodide: ${error}`,
  stillLoading: "Pyodide is still loading...",

  packageNoName: "Please enter a package name to install.",
  packageAlreadyInstalled: (packageName) =>
    `Package '${packageName}' is already installed.`,
  packageInstalling: (packageName) => `Installing ${packageName}...`,
  packageInstalled: (packageName) => `Successfully installed ${packageName}!`,
  packageError: (packageName, error) =>
    `Failed to install '${packageName}': ${error}`,

  noCode: "Please enter some Python code to run.",
  codeExecutedSuccessfully: "Code executed successfully (no output).",
};

// —— Pyodide Loading & Initialization ——
async function loadPyodideCDN() {
  const script = AppUtils.createElement("script");
  script.src = `${pyodideCDN}/pyodide.js`;

  script.onload = async () => {
    try {
      updateOutput(outputMessages.loadingPyodide, "loading");
      pyodide = await loadPyodide({ indexURL: pyodideCDN });
      pyodideLoading = false;
      updateOutput(outputMessages.pyodideLoaded, "success");
    } catch (error) {
      updateOutput(outputMessages.pyodideError(error), "error");
    }
  };

  script.onerror = () => {
    updateOutput(outputMessages.pyodideError("Script unable to load"), "error");
  };

  document.head.appendChild(script);
}

// —— Package Installation ——
async function installPackage() {
  if (pyodideLoading) {
    updateOutput(outputMessages.stillLoading, "warning");
    return;
  }

  const packageName = AppUtils.getValue("pyrepl-package").trim();
  if (!packageName) {
    updateOutput(outputMessages.packageNoName, "warning");
    return;
  }

  if (installedPackages.has(packageName)) {
    updateOutput(outputMessages.packageAlreadyInstalled(packageName), "info");
    return;
  }

  try {
    updateOutput(outputMessages.packageInstalling(packageName), "loading");
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install(packageName);

    installedPackages.add(packageName);
    updateOutput(outputMessages.packageInstalled(packageName), "success");
    AppUtils.setValue("pyrepl-package", "");
  } catch (error) {
    updateOutput(outputMessages.packageError(packageName, error), "error");
  }
}

async function runPyreplCode() {
  if (pyodideLoading) {
    updateOutput(outputMessages.stillLoading, "warning");
    return;
  }

  const code = AppUtils.getValue("pyrepl-input").trim();
  if (!code) {
    updateOutput(outputMessages.noCode, "warning");
    return;
  }

  let output = "";

  pyodide.setStdout({
    batched: (s) => {
      output += s + "\n";
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      output += s;
    },
  });

  try {
    await pyodide.runPythonAsync(code);

    updateOutput(
      output.trim() || outputMessages.codeExecutedSuccessfully,
      "success"
    );
  } catch (error) {
    updateOutput(`${error}`, "error");
  }
}

function updateOutput(message, type = "normal") {
  const outputElement = document.getElementById("pyrepl-output");
  outputElement.value = message;
  applyOutputStyle(outputElement, type);
}

function applyOutputStyle(element, type = "normal") {
  const stylesByType = {
    error: {
      borderColor: "#ff6b6b",
      backgroundColor: "#ffe6e6",
      color: "#d63384",
    },
    success: {
      borderColor: "#4CAF50",
      backgroundColor: "#e8f5e8",
      color: "#155724",
    },
    warning: {
      borderColor: "#ff9800",
      backgroundColor: "#fff3cd",
      color: "#856404",
    },
    loading: {
      borderColor: "#667eea",
      backgroundColor: "#e6f3ff",
      color: "#0066cc",
    },
    info: {
      borderColor: "#17a2b8",
      backgroundColor: "#d1ecf1",
      color: "#0c5460",
    },
    normal: {
      borderColor: "#ddd",
      backgroundColor: "#f8f9fa",
      color: "#333",
    },
  };

  const style = stylesByType[type] || stylesByType["normal"];
  Object.assign(element.style, style);
}

// —— Bootstrapping ——
document.addEventListener("DOMContentLoaded", () => {
  AppUtils.setValue(
    "pyrepl-input",
    'import sys\n\nprint(sys.version)\nprint("-" * 15)\nprint("Made By Yazan!")'
  );
  AppUtils.onClick("pyrepl-run-btn", runPyreplCode);
  AppUtils.onClick("pyrepl-install-btn", installPackage);

  loadPyodideCDN();
});
