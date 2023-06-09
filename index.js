
const ul = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');

function createListItem(item) {

    const li  = document.createElement('li');
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const button = document.createElement('button');

    div.setAttribute('class', 'view');
    input.setAttribute('class','toggle');
    input.setAttribute('type','checkbox'); 
    button.setAttribute('class','destroy');

    label.textContent = item.text; 
    li.setAttribute('id',item.id );
    
    const cond = item.completed == true? "completed" : "" ; 
    li.setAttribute('class',cond); 

    ul.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);
};

function renderTasks() {
    ul.innerHTML = '';    
    Object.values(tasksList).forEach(tasks => createListItem(tasks));
};

let tasksList = [];
const tasksStore = localStorage.getItem('mylist');
tasksStore == null? tasksList = [] : tasksList = JSON.parse(tasksStore);

input.addEventListener('keydown', e => e.key === 'Enter' && createNewTask());

function cleanInput() {
    input.value = "";
};

function randomId(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    const newId = Math.floor(rand);
    let result = tasksList.map(item => item.id);
    let check = result.find(item=>item.id = newId);    
    if (check == true) {
        randomId(min, max);
    } else {
        return newId;
    };
};

function createNewTask() {
    const newTask = input.value;

    if (newTask !== ""|| null) {
    tasksList.push({id: randomId(1 , 10000), text: newTask, completed: false });
       localStorage.setItem('mylist', JSON.stringify(tasksList));
       cleanInput();
       renderTasks()
    };
};

renderTasks();


   
    
