let todoList = [1, 2, 3, 4]

let getTodo = () => {
    document.getElementById("result").innerHTML = "";
    if (todoList.length === 0) {
        document.getElementById("result").innerHTML = "<li>No tasks yet</li>";
        return;
    }

    todoList.forEach((element, index) => {
        document.getElementById("result").innerHTML += ` <li> <span>${element}</span> <button onClick="deleteTodo(${index})">❌</button></li>  `
    });

}
getTodo();
let setTodo = () => {
    let todoInput = document.getElementById("todoInput").value;
    if (todoInput.trim() === "") {
        showToast("Please enter a todo item");
        return;
    }
    document.getElementById("todoInput").value = "";

    todoList.push(todoInput);
    getTodo();
    document.getElementById("todoInput").focus();

}
let deleteTodo = (index) => {
    console.log(index)
    todoList.splice(index, 1);
    getTodo();
    document.getElementById("todoInput").focus();

}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
