const ul = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const tasksStore = localStorage.getItem('mylist');
let tasksList = tasksStore === null? []: JSON.parse(tasksStore)


function createListItem(task) {

    const li  = document.createElement('li');
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const button = document.createElement('button');

    div.setAttribute('class', 'view');
    input.setAttribute('class','toggle');
    input.setAttribute('type','checkbox'); 
    button.setAttribute('class','destroy');
    button.onclick =  ()=> deleteTask(task.id);
    input.onchange = () => changeTaskStatus(task.id);
    
    input.checked = task.completed;
    const cond = task.completed ? "completed" : "" ; 
    li.setAttribute('class',cond); 
    label.textContent = task.text;
    li.setAttribute('id',task.id );
       


    ul.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

};

function renderTasks() {
    ul.innerHTML = '';    
    Object.values(tasksList).forEach(tasks => createListItem(tasks));
    localStorage.setItem('mylist', JSON.stringify(tasksList));  
};

input.addEventListener('keydown', e => e.key === 'Enter' && createNewTask());

function cleanInput() {
    input.value = "";
};

function randomId(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    const newId = Math.floor(rand);
    const ids = tasksList.map(task => task.id);
    const isNewIdExists = ids.includes(newId);    
    if (isNewIdExists === true) {
        randomId(min, max);
    } else {
           return newId;
      };
};

function createNewTask() {
    const newTask = input.value;

    if (newTask !== ""|| null) {
       tasksList.push({id: randomId(1 , 10000), text: newTask, completed:false });
       cleanInput();
       renderTasks();
    };    
};
renderTasks();

function deleteTask (taskId) {
    tasksList = tasksList.filter(task => task.id != taskId);
    renderTasks();
};

function changeTaskStatus(taskId) {
    tasksList = tasksList.map( task=> {
        if (task.id != taskId) {
        return task;
        } else {
            if(task.id = taskId ){
             task.completed = task.completed? false: true;
                return task;
            };
        };
    });
    renderTasks();
};

