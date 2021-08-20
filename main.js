const form =document.getElementById('form')
const input =document.getElementById('input')
const todoList = document.getElementById('todos')
const print = document.getElementById('print')
const navLogo = document.getElementById('nav-logo')
const social = document.getElementById('social')

const todos = JSON.parse(localStorage.getItem('todosItem'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    addTodo();
})

function addTodo(todo){
    let todoText = input.value
    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const todoEl = document.createElement('div');
        todoEl.classList.add('todo');
        if(todo && todo.completed){
            todoEl.classList.add('completed')
        }
        todoEl.innerText= todoText;
        todoEl.addEventListener('click', ()=>{
            todoEl.classList.toggle('completed')
            updateLS();
        })

        todoEl.addEventListener('contextmenu', e => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        todoList.appendChild(todoEl)
        input.value="";
        updateLS()
    }
    
}


function updateLS() {
    const todosEl = document.querySelectorAll('.todo')

    const todoArray = []

    todosEl.forEach(todoEl => {
        todoArray.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todosItem', JSON.stringify(todoArray))
}

print.addEventListener('click', e =>{
    let title = prompt("Please enter your title: ");
    navLogo.innerText='';
    navLogo.innerText=title;
    form.style.display = "none";
    social.style.display="none";
    window.print();
    window.location.reload();
})