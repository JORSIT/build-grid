let notes = [];
let nextId = 1;

function renderNotes() {
  const list = document.getElementById('notes-list');
  list.innerHTML = '';

  for (const note of notes) {
    const item = AppUtils.createElement('div', 'note-item', `
      <div class="note-text">${note.text}</div>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `);
    list.appendChild(item);
  }
}

function addNote() {
  const input = AppUtils.getValue('note-input').trim();
  if (input) {
    notes.push({ id: nextId++, text: input });
    AppUtils.setValue('note-input', '');
    renderNotes();
  }
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  renderNotes();
}

document.addEventListener('DOMContentLoaded', () => {
  AppUtils.onClick('add-note', addNote);

  document.getElementById('note-input')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') addNote();
    });
});
