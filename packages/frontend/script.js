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



function renderSingleTask(task) {
  const li = document.createElement("li");
  li.classList.add("container")
  li.setAttribute("id", task.id)

  const input = document.createElement("input");
  const label = document.createElement("label");
  input.append(label);
  input.classList.add("checkbox-round");
  // label.classList.add("checkmark");

  input.addEventListener("click", async (e) => {
    e.preventDefault();
    const doneId = e.target.closest(".container").id;
    // const text = e.target.closest(".container").querySelector(".todotask").querySelector("h3");
    if (input.checked) {
      await DoneEdit(doneId, 1);
      // text.style.textDecorationLine = "line-through"
      // console.log(e.target.closest(".container").querySelector(".todotask").querySelector("h3"));
    } else {
      await DoneEdit(doneId, 0);
      // text.style.textDecorationLine = "none"
    }
    renderTasks();
  })


  input.type = "checkbox";
  task.isDone === 1 ? (input.checked = true) : (input.checked = false);

  const section = document.createElement("section");
  section.classList.add("todotask");

  const prio = document.createElement("div")
  prio.classList.add("priority");

  const button = document.createElement("button")
  let i = 1;
  const colors = ["#9cd423", "orange", "red"];
  button.style.backgroundColor = colors[task.prio]
  button.addEventListener("click", (e) => {
    const editPrioId = e.target.closest(".container").id;
    if (i > 2) {
      i = 0;
    }
    button.style.backgroundColor = colors[i];
    prioEdit(editPrioId, i);
    i++;




    //renderTasks();
  })


  const h3 = document.createElement("h3");
  if (task.isDone) {
    h3.style.textDecorationLine = "line-through"
  }
  h3.innerText = task.title;
  h3.classList.add("todotask-text");
  h3.setAttribute("contenteditable", "true")


  const div = document.createElement("div");
  div.classList.add("buttons");

  const spanPencil = document.createElement("span");
  spanPencil.classList.add("edit");
  spanPencil.addEventListener("click", async (e) => {
    const titleText = e.target.closest(".todotask").querySelector("h3").innerText;
    e.preventDefault();
    const editTaskId = e.target.closest(".container").id;
    await editTask(editTaskId, titleText);
    renderTasks();
  })
  const spanCross = document.createElement("span");
  spanCross.classList.add("delete");
  spanCross.addEventListener("click", async (e) => {
    e.preventDefault();
    const deleteTaskId = e.target.closest(".container").id;
    await deleteTask(deleteTaskId);
    renderTasks();
  })






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
  div.append(prio);
  prio.append(button)
  li.append(input);
  li.append(section);


  return li;
}

async function renderTasks() {
  const tasks = await fetchTasks();

  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }

  tasks.sort((a, b) => (a.prio < b.prio) ? 1 : ((b.prio < a.prio) ? -1 : 0))

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

const taskSort = document.querySelector(".taskSort");
console.log(taskSort);
taskSort.addEventListener("click", (e) => {
  e.preventDefault();
  renderTasks();
})

async function createNewTask(taskTitle, taskPrio) {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskTitle, prio: taskPrio }),
  });
  const result = await response.json();
  return result;
}

async function deleteTask(taskId) {
  const response = await fetch("http://localhost:3001/task/" + taskId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskId }),
  });
  const result = await response.json();
  return result;
}

async function editTask(taskId, taskTitle) {
  const response = await fetch("http://localhost:3001/task/" + taskId + "/title", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskTitle }),
  });
  const result = await response.json();
  return result;
}

async function DoneEdit(taskId, taskisDone) {
  const response = await fetch("http://localhost:3001/task/" + taskId + "/isdone", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: taskisDone }),
  });
  const result = await response.json();
  return result;
}

async function prioEdit(taskId, taskPrio) {
  const response = await fetch("http://localhost:3001/task/" + taskId + "/prio", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prio: taskPrio }),
  });
  const result = await response.json();
  return result;
}




// DoneEdit(27, 0);
renderTasks();
