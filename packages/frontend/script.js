import "./styles/style.scss";

const listItem = document.querySelector(".todotask");
const todoList = document.querySelector("#todolist");
const isChecked = document.querySelector(".cbox4:checked");

let todos = [];

function createTodo(todo) {
  const newTodoItem = document.createElement("li");
  newTodoItem.setAttribute("class", "container");
  newTodoItem.innerHTML = `
    <aside class="round">
            <input
              type="checkbox"
              onchange="\${toggleCheck()}"
              class="cbox4"
            />
            <label for="checkbox"></label>
          </aside>
          <section class="todotask">
            <label class="todotask-text" for="cbox4">${todo.title}</label>
            <div class="buttons">
              <span class="edit">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </span>
              <span class="delete">
                <i class="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
          </section>
    `;
  return newTodoItem;
}
function renderTodos() {
  todos.forEach((todo) => {
    const newTodo = createTodo(todo);
    todoList.appendChild(newTodo);
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

function fetchTasks() {
  fetch("http://localhost:3001/tasks")
    .then((response) => response.json())
    .then((data) => (todos = data))
    .then(() => console.log(todos));
}
fetchTasks();
// renderTodos();
