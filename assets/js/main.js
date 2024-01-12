let todoId = 0;
let questionForms = document.getElementById("question-form");
questionForms.addEventListener("submit", (e) => {
  e.preventDefault();
  processSubmit(e);
});

const processSubmit = (e) => {
  let todoInputValue = document.getElementById("submit-button").value;

  let waitingDiv = document.getElementById("waiting-box");
  waitingDiv.innerHTML = "<p class = 'text-center'>Loading...</p>";

  if (!todoInputValue) {
    waitingDiv.innerHTML =
      "<p class ='col-md-6 mt-2 mx-auto alert alert-danger'>Please add value</p>";
    return false;
  }
  waitingDiv.innerHTML = "";
  let listItemValue = buildHtml(todoInputValue, todoId);

  listTodos = document.getElementById("addingList");
  listTodos.insertAdjacentHTML("afterbegin", listItemValue); // afterbegin: @see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

  let deleteButton = document.querySelector("#delete-btn-" + todoId);
  let checkButton = document.querySelector("#flexCheckDefault-" + todoId);

  handleDelete(deleteButton);
  handleCheckbox(checkButton);

  addTodoLocalStorage(todoInputValue, todoId);
  todoId++;
};

const handleDelete = (element) => {
  element.addEventListener("click", (e) => {
    processDelete(element, e);
  });
};

const processDelete = (element, e) => {
  thisTodoId = element.id.replace("delete-btn-", "");
  element.closest("li").remove();
  addedTodos = localStorage.getItem("todoLIst");
  if (addedTodos) {
    todoList = JSON.parse(addedTodos);
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == thisTodoId) {
        todoList.splice(i, 1);
      }
    }
    localStorage.setItem("todoLIst", JSON.stringify(todoList));
  }
};

const handleCheckbox = (element) => {
  element.addEventListener("click", (e) => {
    processCheck(element, e);
  });
};

const processCheck = (element, e) => {
  thisTodoId = element.id.replace("flexCheckDefault-", "");

  addedTodos = localStorage.getItem("todoLIst");
  if (addedTodos) {
    todoList = JSON.parse(addedTodos);
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == thisTodoId) {
        todoList[i].checked = element.checked;
      }
    }
    localStorage.setItem("todoLIst", JSON.stringify(todoList));
  }
  if (element.checked === true) {
    element.closest("li").classList.add("bg-primary", "bg-opacity-75");
  } else {
    element.closest("li").classList.remove("bg-primary", "bg-opacity-75");
  }
};

const buildHtml = (todoText, todoId, isChecked) => {
  let todoClass = isChecked ? "bg-primary" : "";
  let inputChecked = isChecked ? "checked" : "";
  let listItemValue =
    "<li class='list-item list-group p-2 mb-1 border-bottom border-2" +
    todoClass +
    "'>";
  listItemValue += "<div class='to-do-box d-flex justify-content-md-between'>";
  listItemValue += "<div class='form-check'>";
  listItemValue +=
    "<input class='form-check-input' type='checkbox' " +
    inputChecked +
    "  id='flexCheckDefault-" +
    todoId +
    "'>";
  listItemValue +=
    "<label class='form-check-label' for='flexCheckDefault-" + todoId + "'>";
  listItemValue += "<p>" + todoText + "</p>";
  listItemValue += "</label>";
  listItemValue += "</div>";
  listItemValue +=
    "<button class='btn btn-close delete-btn' id='delete-btn-" +
    todoId +
    "'></button>";
  listItemValue += "</div>";
  listItemValue += "</li>";
  return listItemValue;
};

const addTodoLocalStorage = (todoInputValue, id) => {
  todoList = [];
  addedTodos = localStorage.getItem("todoLIst");
  if (addedTodos) {
    todoList = JSON.parse(addedTodos);
  }
  todoList.push({ id: id, content: todoInputValue, checked: false });
  localStorage.setItem("todoLIst", JSON.stringify(todoList));
};

const renderTodosListFromLocalStorage = () => {
  todoList = [];
  addedTodos = localStorage.getItem("todoLIst");
  if (addedTodos) {
    todoList = JSON.parse(addedTodos);
  }

  // 0 => {}
  // 2 => {}

  listTodos = document.getElementById("addingList");
  for (let i = 0; i < todoList.length; i++) {
    let listItemValue = buildHtml(
      todoList[i].content,
      
      todoList[i].id,
      todoList[i].checked
    );
    listTodos.insertAdjacentHTML("afterbegin", listItemValue);
  }

  let checkButton = document.querySelectorAll(".form-check-input");
  if (checkButton.length) {
    checkButton.forEach((element) => {
      handleCheckbox(element);
    });
  }

  let deleteButton = document.querySelectorAll(".delete-btn");
  if (deleteButton.length) {
    deleteButton.forEach((element) => {
      handleDelete(element);
    });
  }

  todoId = 1 + todoList[todoList.length - 1].id;
};
renderTodosListFromLocalStorage();

















<!-- <form class="mt-3">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select a city" required>
            <!-- <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
        </div>
    </form>
     -->