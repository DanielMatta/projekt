import "./styles/style.scss";

const listItem = document.querySelector(".todotask");
const todoList = document.querySelector("#todolist");
const isChecked = document.querySelector(".cbox4:checked");

let todos = null;

function createTask(task) {
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
    const taskElement = createTask(task);
    todoList.appendChild(taskElement);
  });
}

function toggleCheck(event) {
  console.log(event);
  if (event.target.checked) {
    listItem.style.textDecoration = "line-through";
  } else {
    listItem.style.textDecoration = "none";
  }
}

async function fetchTasks() {
  const response = await fetch("http://localhost:3001/tasks");
  const data = await response.json();
  return data;
}

renderTasks();
