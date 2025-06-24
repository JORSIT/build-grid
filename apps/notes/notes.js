let notes = [];
let noteNextId = 1;

function renderNotes() {
  const list = document.getElementById('notes-list');
  list.innerHTML = '';

  for (const note of notes) {
    const item = AppUtils.createElement('div', 'note-item');

    // عرض نص الملاحظة
    const noteText = AppUtils.createElement('div', 'note-text', note.text);
    noteText.id = `note-text-${note.id}`;

    // حقل تعديل (مخفي بالبداية)
    const editInput = AppUtils.createElement('input', 'edit-input');
    editInput.style.display = 'none';
    editInput.value = note.text;
    editInput.id = `edit-input-${note.id}`;

    // زر تعديل
    const editButton = AppUtils.createElement('button', '', 'Edit');
    editButton.onclick = () => startEditing(note.id);

    // زر حفظ التعديل (مخفي بالبداية)
    const saveButton = AppUtils.createElement('button', '', 'Save');
    saveButton.style.display = 'none';
    saveButton.onclick = () => saveEdit(note.id);
    // زر إلغاء التعديل (مخفي بالبداية)
    const cancelButton = AppUtils.createElement('button', '', 'Cancel');
    cancelButton.style.display = 'none';
    cancelButton.onclick = () => cancelEdit(note.id);


    // زر حذف
    const deleteButton = AppUtils.createElement('button', '', 'Delete');
    deleteButton.onclick = () => deleteNote(note.id);

    // ترتيب العناصر داخل العنصر الرئيسي
    item.appendChild(noteText);
    item.appendChild(editInput);
    item.appendChild(editButton);
    item.appendChild(saveButton);
    item.appendChild(cancelButton);
    item.appendChild(deleteButton);

    list.appendChild(item);
  }
}

function addNote() {
  const input = AppUtils.getValue('note-input').trim();
  if (input) {
    notes.push({ id: noteNextId++, text: input, editing: false });
    AppUtils.setValue('note-input', '');
    renderNotes();
    showAlert('Note added!');
  }
}

function deleteNote(id) {
  // إنشاء نافذة منبثقة
  const confirmPopup = document.createElement('div');
  confirmPopup.className = 'confirm-popup';

  const content = document.createElement('div');
  content.className = 'popup-content';

  const message = document.createElement('p');
  message.textContent = 'Are you sure you want to delete this note?';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'popup-buttons';

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Yes';
  confirmButton.onclick = () => {
    notes = notes.filter(note => note.id !== id);
    renderNotes();
    showAlert('Note deleted!');
    document.body.removeChild(confirmPopup);
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = () => {
    document.body.removeChild(confirmPopup);
  };

  buttonContainer.appendChild(confirmButton);
  buttonContainer.appendChild(cancelButton);

  content.appendChild(message);
  content.appendChild(buttonContainer);
  confirmPopup.appendChild(content);

  document.body.appendChild(confirmPopup);
}


function startEditing(id) {
  // إخفاء النص، إظهار input
  document.getElementById(`note-text-${id}`).style.display = 'none';
  document.getElementById(`edit-input-${id}`).style.display = 'inline';

  // إظهار زر Save، إخفاء زر Edit
  const buttons = document.getElementById(`edit-input-${id}`).parentElement.querySelectorAll('button');
  buttons[0].style.display = 'none'; // Edit
  buttons[1].style.display = 'inline'; // Save
  buttons[2].style.display = 'inline'; // Cancel
}

function saveEdit(id) {
  const newText = document.getElementById(`edit-input-${id}`).value.trim();
  if (newText) {
    const note = notes.find(n => n.id === id);
    note.text = newText;
    renderNotes(); // لإعادة عرض القائمة بعد التعديل
    showAlert('Note saved!');

  }
}
function cancelEdit(id) {
  // إخفاء input وإظهار النص
  document.getElementById(`edit-input-${id}`).style.display = 'none';
  document.getElementById(`note-text-${id}`).style.display = 'block';

  // إظهار زر Edit، إخفاء زر Save وCancel
  const buttons = document.getElementById(`edit-input-${id}`).parentElement.querySelectorAll('button');
  buttons[0].style.display = 'inline'; // Edit
  buttons[1].style.display = 'none';   // Save
  buttons[2].style.display = 'none';   // Cancel
}

document.addEventListener('DOMContentLoaded', () => {
  AppUtils.onClick('add-note', addNote);

  document.getElementById('note-input')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') addNote();
    });
});
// لاظهار التطبيق او الاخفاء
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
function showAlert(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  document.body.appendChild(toast);

  // إظهار التوست
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // إخفاء التوست بعد 3 ثواني
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}
