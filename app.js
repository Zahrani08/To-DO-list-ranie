// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = '';
}

// Function to create a new task element
function createTaskElement(taskText) {
  const li = document.createElement('li');

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', () => editTask(taskSpan));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteTask(li, taskText));

  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Function to edit a task
function editTask(taskSpan) {
  const newTaskText = prompt('Edit your task:', taskSpan.textContent);
  if (newTaskText && newTaskText.trim() !== '') {
    const oldTaskText = taskSpan.textContent;
    taskSpan.textContent = newTaskText.trim();
    updateTaskInStorage(oldTaskText, newTaskText.trim());
  }
}

// Function to delete a task
function deleteTask(taskElement, taskText) {
  taskList.removeChild(taskElement);
  removeTaskFromStorage(taskText);
}

// Save task to local storage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from local storage
function removeTaskFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in local storage
function updateTaskInStorage(oldTask, newTask) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.indexOf(oldTask);
  if (index !== -1) {
    tasks[index] = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task));
}
