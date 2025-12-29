document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.add .btn-add');
  const taskInput = document.querySelector('.add input[type="text"]');
  const todoList = document.querySelector('.todos');
  const footerDiv = document.querySelector('.card footer div');
  const sideChips = document.querySelectorAll('.side .chip');

  // simple unique id generator
  let idCounter = Date.now();

  const getTotal = () => todoList.children.length;
  const getCompleted = () => todoList.querySelectorAll('input[type="checkbox"]:checked').length;

  function updateStats() {
    footerDiv.textContent = `${getTotal()} Tasks Listed`;
    if (sideChips[0]) sideChips[0].textContent = `Today - ${getTotal()} Tasks`;
    if (sideChips[1]) sideChips[1].textContent = `Completed - ${getCompleted()} Tasks`;
  }

  function createTask(text) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `t${++idCounter}`;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(label);

    return li;
  }

  function addTask() {
    const value = taskInput.value.trim();
    if (!value) {
      alert('Please enter a task!');
      taskInput.focus();
      return;
    }
    todoList.appendChild(createTask(value));
    taskInput.value = '';
    taskInput.focus();
    updateStats();
  }

  // avoid accidental form submits
  addButton.type = 'button';
  addButton.addEventListener('click', addTask);

  // support Enter key
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // delegate checkbox changes to update completed count
  todoList.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) updateStats();
  });

  // initialize display from existing DOM
  updateStats();
});
