const form = document.getElementById("task-form");
const input = document.getElementById('task-input');
const list = document.getElementById('tasks-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

form.addEventListener('submit', function (e){
    e.preventDefault();

    if (input.value.trim() === '') return;

    const task = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
        
});

function renderTasks() {

    list.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        li.dataset.id = task.id;
        
        if (task.completed){
            li.classList.add('task-completed');
        }

        list.appendChild(li);
    });
}

list.addEventListener ('click', function (e){
    if (e.target.tagName === 'LI') {
        const id = Number(e.target.dataset.id);
        toggleTask(id)
    }
})

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    task.completed = !task.completed;

    saveTasks();
    renderTasks();
}

