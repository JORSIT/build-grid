// —— Globals & State ——
let todos = [];
let nextId = 1;

function showMain() {
  AppUtils.show('main-view');
  document.querySelectorAll('.todo-app').forEach(app =>
    app.classList.remove('active')
  );
}

// —— Todo-list core ——
function addTodo() {
  const text = AppUtils.getValue('todo-input').trim();
  if (!text) return;
  todos.push({ id: nextId++, text, completed: false });
  AppUtils.setValue('todo-input', '');
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(({ id, text, completed }) => {
    const li = AppUtils.createElement('li', 
      `todo-item ${completed ? 'completed' : ''}`,
      `
        <input type="checkbox" class="todo-checkbox"
               ${completed ? 'checked' : ''}
               onchange="toggleTodo(${id})">
        <span class="todo-text">${text}</span>
        <div class="todo-actions">
          <button class="delete-button" onclick="deleteTodo(${id})">
            Delete
          </button>
        </div>
      `
    );
    list.appendChild(li);
  });
}

function handleKeyPress(e) {
  if (e.key === 'Enter') addTodo();
}

// —— Bootstrapping ——  
document.addEventListener('DOMContentLoaded', () => {
  todos = [
    { id: 1, text: "Explore this app!", completed: true },
    { id: 2, text: "Fork/Clone this repository!", completed: false },
    { id: 3, text: "Find your card and update it to \"implemented\" status only when done implementing!", completed: false },
    { id: 4, text: "Add your app section to the HTML and implement your assigned functionality", completed: false  },
    { id: 5, text: "Create a new branch and submit a Pull Request to be reviewd and merged", completed: false  },
    { id: 6, text: "See your app go live for everyone to explorre and see!", completed: false  },
  ];
  nextId = 7;
  renderTodos();
});