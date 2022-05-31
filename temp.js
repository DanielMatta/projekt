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
