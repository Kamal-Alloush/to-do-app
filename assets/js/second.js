//update front end

const updateDisplay = () => {
  const container = document.getElementById("addingList");
  container.innerHTML = "";

  todos.map((todo, i) => {
    const innerContainer = document.createElement("li");
    innerContainer.classList.add("list-item", "list-group", "p-2");
    innerContainer.innerHTML =
      `<div class="to-do-box d-flex justify-content-md-between w-100">
    <div class="to-do-box d-flex justify-content-md-between w-100">
      <div class="form-check">
          <input type="checkbox" class="form-check-input">
          <label class="form-check-label"><p>` +
      todo +
      `</p></label>
      </div>
      <button class="btn btn-close delete-btn"></button>
    </div>`;
    // const card = innerContainer.querySelector(".card");
    // const list = document.createElement("li");
    // list.appendChild(document.createElement("p"));
    // list.querySelector("p").innerHTML = todo;
    // const removeButton = document.getElementById("delete-btn");

    const removeButton = innerContainer.querySelector(".delete-btn");
    removeButton.onclick = () => {
      removeTodo(i);
    };
    //add event listener to the remove button
    container.appendChild(innerContainer);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

let todos;
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));

  if (todos.length) {
    updateDisplay();
  }
} else todos = [];

let questionForms = document.getElementById("question-form");
questionForms.addEventListener("submit", (e) => {
  e.preventDefault();
  createTodo();
});
//create the todo

let createTodo = () => {
  if (document.getElementById("submit-button").value == "") return false;

  todos.push(document.getElementById("submit-button").value);
  updateDisplay();
  document.getElementById("submit-button").value = "";
  return false;
};

//remove todo

let removeTodo = (index) => {
  todos.splice(index, 1);
  updateDisplay();
};
