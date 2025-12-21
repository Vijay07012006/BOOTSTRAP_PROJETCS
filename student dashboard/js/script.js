let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const dueDate = document.getElementById('taskDate').value;

  if (!title) return alert("Please enter a task");

  tasks.push({ title, priority, dueDate, id: Date.now() });
  saveTasks();
  renderTasks();
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDate').value = '';
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit Task:", task.title);
  if (newTitle !== null && newTitle.trim() !== "") {
    task.title = newTitle.trim();
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  const container = document.getElementById('tasksContainer');
  const search = document.getElementById('searchInput').value.toLowerCase();
  container.innerHTML = '';

  tasks
    .filter(task => task.title.toLowerCase().includes(search))
    .forEach(task => {
      const card = document.createElement('div');
      card.className = `task-card ${task.priority.toLowerCase()}`;
      card.innerHTML = `
        <div class="task-title"><strong>${task.title}</strong></div>
        <div class="task-meta">Priority: ${task.priority} | Due: ${task.dueDate || 'N/A'}</div>
        <div class="task-actions">
          <button onclick="editTask(${task.id})">✏️</button>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;
      container.appendChild(card);
    });
}

function updateDateTime() {
  const now = new Date();
  document.getElementById('dateTime').textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.getElementById('toggleMode').textContent =
    document.body.classList.contains('dark') ? '☀️' : '🌙';
});

renderTasks();
