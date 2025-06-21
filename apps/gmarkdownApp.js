// —— Messages ——
const MD_MSGS = {
  missingInput: "⚠️ Markdown Previewer: missing #markdown-input",
  parseError: "❌ Error rendering Markdown",
  parserLoadErr: "⚠️ Could not load Markdown parser.",
};

// —— Constants ——
const MARKED_CDN = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
const STARTER_MD = "# Hello World!\n This is **Markdown**";

/**
 * Read the textarea, convert via marked.parse, and update preview.
 */
function renderPreview() {
  const md = AppUtils.getValue("markdown-input");
  const outEl = document.getElementById("markdown-output");
  if (!outEl) return;

  try {
    outEl.innerHTML = marked.parse(md);
  } catch {
    outEl.textContent = MD_MSGS.parseError;
  }
}

/**
 * Initialize UI: set starter text, render once, bind input→render.
 */
function initPreviewer() {
  const inEl = document.getElementById("markdown-input");
  if (!inEl) {
    console.error(MD_MSGS.missingInput);
    return;
  }

  AppUtils.setValue("markdown-input", STARTER_MD);
  renderPreview();
  inEl.addEventListener("input", renderPreview);
}

/**
 * Inject marked.js from CDN, then call initPreviewer().
 */
function loadMarked() {
  const script = AppUtils.createElement("script");
  script.src = MARKED_CDN;
  script.onload = initPreviewer;

  script.onerror = () => {
    console.error(MD_MSGS.parserLoadErr);
    const outEl = document.getElementById("markdown-output");
    if (outEl) outEl.textContent = MD_MSGS.parserLoadErr;
  };

  document.head.appendChild(script);
}

// —— Bootstrap on DOM ready ——
document.addEventListener("DOMContentLoaded", loadMarked);
