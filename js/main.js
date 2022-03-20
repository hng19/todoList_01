//1. Các chức năng:
//Thêm công việc
//Xoá công việc
//Chỉnh sửa công cv
//Lọc công việc theo trạng thái
//Thay đổi trạng thái cv


//2.Đối tượng trong ứng dụng:
//Các công việc
//3. Thuộc tính của đối tượng:
//Trạng thái -> status
//Tiêu đề -> title
//Id -> id

function randomId() {
    return Math.floor(Math.random() * 1000000)
}

let todos
 = [
    {
        id: randomId(),
        title: "Đi đá bóng",
        status: false,
    },
    {
        id: randomId(),
        title: "Làm BTVN",
        status: true,
    },
    {
        id: randomId(),
        title: "Đi kiểm tra sức khoẻ",
        status: true,
    }
]

//Truy cap:
const todoList = document.querySelector(".todo-list")
const optionAll = document.getElementById("all")
const optionActive = document.getElementById("active")
const optionUnactive = document.getElementById("unactive")

const inputEl = document.getElementById("todo-input")
const btnAdd = document.getElementById("btn-add")

function renderTodo(arr) {
    //Xoa het du lieu truoc khi render
    todoList.innerText = "";
    if (arr.length == 0) {
        todoList.innerHTML = "Khong co cong viec trong danh sach"
        return
    }

    let html = "";
    for (let i = 0; i < arr.length; i++) {
        const t = arr[i];
        html += `
            <div class="todo-item ${t.status ? "active-todo" : ""}">
                <div class="todo-item-title" id="${t.id}">
                    <input 
                        type="checkbox" 
                        ${t.status ? "checked" : ""}
                        onclick="toggleStatus(${t.id})"
                    />
                    <p>${t.title}</p>
                    <input class="hidden" type="text"/>
                </div>
                <div class="option">
                    <button class="btn btn-update" onclick="editTodo(${t.id})">
                        <img src="./img/pencil.svg" alt="icon" />
                    </button>
                    <button class="btn btn-delete" onclick="deleteTodo(${t.id})">
                        <img src="./img/remove.svg" alt="icon" />
                    </button>
                </div>
            </div>
        `
    }
    todoList.innerHTML = html
}

//1.Xoa cv
function deleteTodo(id) {
todos = todos.filter(todo => todo.id != id)
setDataToLocalStorage(todos)

}

//2.Thay đổi trạng thái cv

function toggleStatus(id) {
    for (let i = 0; i < todos.length; i++) {
        if(todos[i].id == id) {
            todos[i].status = !todos[i].status
        }
        
    }
    setDataToLocalStorage(todos)

}

//3.Loc cv theo trang thai:
optionAll.addEventListener("click", function() {
    renderTodo(todos)
})

optionActive.addEventListener("click", function() {
   let todoActive = todos.filter(todo => todo.status == true)
   
   renderTodo(todoActive)

})
optionUnactive.addEventListener("click", function() {
    let todoUnactive = todos.filter(todo => todo.status == false)
    renderTodo(todoUnactive)
 
 })


//4.Them cong viec:
inputEl.value = inputEl.innerText
btnAdd.addEventListener("click", function() {
    
    if(!inputEl.value) {
        alert("Noi dung khong duoc de trong")
        return
    }
    newTodo = {
        id: randomId(),
        title: inputEl.value,
        status: false

    }
    todos.push(newTodo);
    //luu du lieu vao localStorage
    setDataToLocalStorage(todos)
})
renderTodo(todos)

//5.Chinh sua cong viec:
function editTodo(id) {
    const todoItem = document.getElementById(id);
    const editInput = todoItem.querySelector("input:nth-child(3)");
    const content = todoItem.querySelector("p")
    editInput.classList.toggle("hidden")
    content.classList.toggle("hidden")
    editInput.value = content.innerText

    editInput.addEventListener("keydown", function(event) {
        console.log(event.key);
        if(event.key == "Enter") {
            todos.forEach(todo => {
                if(todo.id == id) {
                    todo.title = editInput.value
                }
            })
            renderTodo(todos)
        }
    })
}
setDataToLocalStorage(todos)
//Lay du lieu tu localStorage
function getDataFromLocalStorage() {
    let localStorageValue = localStorage.getItem("todos")
    if(localStorageValue) {
       todos = JSON.parse(localStorageValue)
    } else {
        todos = [];
    }
    renderTodo(todos)
}

//Luu du lieu:
function setDataToLocalStorage(arr) {
    localStorage.setItem("todos", JSON.stringify(arr));
    renderTodo(todos)
}

window.onload = getDataFromLocalStorage