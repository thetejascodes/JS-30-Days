let todoList = JSON.parse(localStorage.getItem("todoList")) || [];


const addTodo = () => {
    const todoInput = document.getElementById("new-todo").value.trim();
    const userPriority = document.getElementById("priority").value;
    const DateEl = document.getElementById("due-date").value.trim();
    if (DateEl === "") {
        showToast("Enter Date");
        return;
    }
    if (todoInput === "") {
        showToast("Enter Valid Input");
        return;
    }

    const todoObj = {
        id: Date.now().toString(),
        title: todoInput,
        priority: userPriority || "Low",
        isDone: false,
        dueDate: DateEl,
        createdAt: new Date().toISOString(),
    }
    todoList.push(todoObj);
    updateLocalStorage();
    renderTodo();
    showToast("Todo Added Successfully");

}


const renderTodo = () => {
    document.getElementById("new-todo").value = "";
    const todoListElement = document.getElementById("todo-list")
    todoListElement.innerHTML = "";
    if (todoList.length === 0) {
        document.getElementById("todo-list").innerHTML = "<li>No tasks yet</li>";
        return;
    }
    const filterSelector = document.querySelector('input[name="filter"]:checked').value;
    const filterTodos = todoList.filter(todo=>{
        if(filterSelector === "All") return true;
        if(filterSelector === "Active") return !todo.isDone;
        if(filterSelector === "Completed") return todo.isDone;
    })
    if(filterTodos.length === 0){
        document.getElementById("todo-list").innerHTML = "<li>No tasks found</li>";
        return;
    }
    let activeTask = 0;
    filterTodos.forEach((element, index) => {
        const todoListElement = document.getElementById("todo-list");
        const priority = element.priority;
        const isDone = element.isDone;
        const counter = document.getElementById("counter");
        if(!element.isDone) activeTask++;
        const isDateOverDue = new Date(element.dueDate) < new Date().setHours(0, 0, 0, 0);
        todoListElement.innerHTML += `<li data-priority="${priority}"><span class="${isDone ? 'done' : ''}">${element.title}</span>
        <span class="priority-label"}"></span>
        <span class="due-date ${isDateOverDue ? 'isDueDateOver' : ''}">📅Due:${element.dueDate}</span>
        <div class="task-buttons">
         <label class="custom-checkbox">
         <input type="checkbox" ${isDone ? "checked" : ""} onClick="toggleDone(${index})"  class="custom-checkbox"/> 
         <span class="checkmark"></span>
        </label>
        <button class="edit-btn" onclick="editTodo(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">🗑️</button>
     
    </div></li>`;
    counter.innerHTML = `${activeTask} Active Tasks Remaining`

    })
}
const toggleDone = (index) => {
    todoList[index].isDone = !todoList[index].isDone;
    showToast(todoList[index].isDone ? "Task Completed" : "Task Marked as Incomplete");
    updateLocalStorage();
    renderTodo();
}
const editTodo = (index) => {
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = `<input type="text" id="edit-todo"> <button id="save-todo-button" onClick="saveTodo(${index})">Save</button>`;
}

const saveTodo = (index) => {
    const editTodoInput = document.getElementById("edit-todo").value.trim();
    if (editTodoInput === "") {
        showToast("Enter Valid Input");
        return;
    }
    todoList[index].title = editTodoInput;
    updateLocalStorage();
    renderTodo();

}
const deleteTodo = (index) => {
    console.log(index);
    todoList.splice(index, 1)
    updateLocalStorage();
    renderTodo();
    document.getElementById("new-todo").focus();
    showToast("Todo Deleted Successfully");
}

const clearAll = () => {
    todoList = [];
    showToast("All Todos Deleted");
    updateLocalStorage();
    renderTodo();
}
function updateLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}


function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

const addTodoButton = document.getElementById("add-todo-button");
const clearAllButton = document.getElementById("clear-all");
addTodoButton.addEventListener("click", addTodo);
clearAllButton.addEventListener("click", clearAll)
document.querySelectorAll('input[name="filter"]').forEach(radio=>{
    radio.addEventListener("change",renderTodo)
})
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.getElementById("dark-mode-toggle").innerText = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.getElementById("dark-mode-toggle").innerText = "Light Mode";
}

renderTodo();
