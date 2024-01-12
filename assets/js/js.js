let todos;
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  updateDisplay();
} else todos = [];

//create the todo
function createTodo() {
  console.log("submitted");
  if (document.getElementById("todoInput").value == "") return false;

  todos.push(document.getElementById("todoInput").value);
  updateDisplay();
  document.getElementById("todoInput").value = "";
  return false;
}
//remove todo
function removeTodo(index) {
  todos.splice(index, 1);
  updateDisplay();
}

//update front end
function updateDisplay() {
  const container = document.getElementById("todoList");
  container.innerHTML = "";
  todos.map((todo, i) => {
    const innerContainer = document.createElement("div");
    innerContainer.innerHTML = ` <div class="row">
    <div class="col s12 m6">
      <div class="card blue darken-2">
        </div>
      </div>`;
    const card = innerContainer.querySelector(".card");
    console.log(todo);
    const div = document.createElement("div");
    div.className = "todoListInner";
    div.appendChild(document.createElement("p"));
    div.querySelector("p").innerHTML = todo;
    div.querySelector("p").className = "card-title";
    div.classList.add("card-content", "white-text");
    const removeButton = document.createElement("a");
    removeButton.classList.add("waves-effect", "waves-light", "btn");
    removeButton.innerHTML = "remove";
    removeButton.onclick = function () {
      removeTodo(i);
    };
    const finishedDiv = document.createElement("div");
    finishedDiv.className = "card-action";
    finishedDiv.innerHTML = `  
    <div class="switch">
        <label>
        Working on it
        <input type="checkbox">
        <span class="lever"></span>
        Finished
        </label>
    </div>`;
    finishedDiv.querySelector("input").onchange = function () {
      innerContainer.classList.contains("finished")
        ? innerContainer.classList.remove("finished")
        : innerContainer.classList.add("finished");
    };
    finishedDiv.appendChild(removeButton);
    card.appendChild(div);
    card.appendChild(finishedDiv);

    container.appendChild(innerContainer);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}