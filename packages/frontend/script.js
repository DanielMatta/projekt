import "./styles/style.scss";

const todoList = document.getElementById("todolist");
const taskForm = document.getElementById("new_task_form");
const taskFormInput = document.getElementById("new_task_input");
const buttons = document.getElementsByClassName("buttons");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTaskInputValue = taskForm.elements.new_task_input.value;
  await createNewTask(newTaskInputValue);
  taskForm.elements.new_task_input.value = "";
  renderTasks();
});

// buttons.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const deleteTaskId = document.getElementById("?");

// })



function renderSingleTask(task) {
  const li = document.createElement("li");
  li.classList.add("container")

  const input = document.createElement("input");
  const label = document.createElement("label");
  input.append(label);
  input.classList.add("checkbox-round");
  label.classList.add("checkmark");
  input.type = "checkbox";
  task.isDone === 1 ? (input.checked = true) : (input.checked = false);

  const section = document.createElement("section");
  section.classList.add("todotask");

  const h3 = document.createElement("h3");
  h3.innerText = task.title;
  h3.classList.add("todotask-text");

  const div = document.createElement("div");
  div.classList.add("buttons");

  const spanPencil = document.createElement("span");
  spanPencil.classList.add("edit");
  const spanCross = document.createElement("span");
  spanCross.classList.add("delete");
  li.setAttribute("id", task.id)


  const iconEdit = document.createElement("i");
  iconEdit.classList.add("fa");
  iconEdit.classList.add("fa-pencil");

  const iconDelete = document.createElement("i");
  iconDelete.classList.add("fa");
  iconDelete.classList.add("fa-times");

  spanPencil.append(iconEdit);
  spanCross.append(iconDelete);
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

async function deleteTask(taskId) {
  const response = await fetch("http://localhost:3001/task/:taskId", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskId }),
  });
  const result = await response.json();
  return result;
}

deleteTask(6);
renderTasks();
