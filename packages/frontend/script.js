import "./styles/style.scss";

const todoList = document.getElementById("todolist");
const taskForm = document.getElementById("new_task_form");
const taskFormInput = document.getElementById("new_task_input");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTaskInputValue = taskForm.elements.new_task_input.value;
  await createNewTask(newTaskInputValue);
  taskForm.elements.new_task_input.value = "";
  renderTasks();
});

function renderSingleTask(task) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.classList.add("checkbox-round");
  input.type = "checkbox";
  task.isDone === 1 ? (input.checked = true) : (input.checked = false);

  const section = document.createElement("section");

  const h3 = document.createElement("h3");
  h3.innerText = task.title;

  const div = document.createElement("div");

  const spanPencil = document.createElement("span");
  const spanCross = document.createElement("span");

  div.append(spanPencil);
  div.append(spanCross);
  section.append(h3);
  section.append(div);
  li.append(input);
  li.append(section);

  return li;
}

async function renderTasks() {
  const tasks = await fetchTasks();

  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }

  tasks.forEach((task) => {
    const taskElement = renderSingleTask(task);
    todoList.appendChild(taskElement);
  });
}

async function fetchTasks() {
  const response = await fetch("http://localhost:3001/tasks");
  const data = await response.json();
  return data;
}

async function createNewTask(taskTitle) {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskTitle }),
  });
  const result = await response.json();
  return result;
}

renderTasks();
