// —— Messages ——
const MD_MSGS = {
  missingInput: '⚠️ Missing #markdown-input',
  parseError:   '❌ Error rendering Markdown',
  parserErr:    '⚠️ Could not load Markdown parser',
};

// —— Constants ——
const GITHUB_CSS =
  'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css';
const MARKED_JS =
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
const STARTER_MD =
  '# Markdown Previewer\n\nStart **Typing!**';


/**
 * Read the textarea, convert via marked.parse, and update preview.
 */
function renderPreview() {
  const md    = AppUtils.getValue('markdown-input');
  const outEl = document.getElementById('markdown-output');
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
  const inEl = document.getElementById('markdown-input');
  if (!inEl) {
    console.error(MD_MSGS.missingInput);
    return;
  }

  AppUtils.setValue('markdown-input', STARTER_MD);
  renderPreview();
  inEl.addEventListener('input', renderPreview);
}

/**
 * 1) Inject GitHub Markdown CSS  
 * 2) Inject marked.js  
 * 3) On marked.onload → initPreviewer()
 */
function loadMarkdownAssets() {
  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = GITHUB_CSS;
  
  document.head.appendChild(link);

  // Inject marked.js
  const script = AppUtils.createElement('script');
  script.src    = MARKED_JS;
  script.onload = initPreviewer;

  script.onerror = () => {
    console.error(MD_MSGS.parserErr);
    const outEl = document.getElementById('markdown-output');
    if (outEl) outEl.textContent = MD_MSGS.parserErr;
  };

  document.head.appendChild(script);
}

// —— Bootstrap ——
document.addEventListener('DOMContentLoaded', loadMarkdownAssets);