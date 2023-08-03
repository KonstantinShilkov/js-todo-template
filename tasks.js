const ul = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const tasksStore = localStorage.getItem('mylist');
let tasksList = tasksStore === null? []: JSON.parse(tasksStore)
const footerStatus = document.querySelector('.footer');
const itemsLeft = document.querySelector('.todo-count');
const ulFilters = document.querySelector('.filters');
const clearCompletedButton = document.querySelector('.clear-completed');
const filter = getFilter();

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

function renderTasks(currentTasksList,filter) {

        ul.innerHTML = '';
        let filteredList = [...currentTasksList];
        
        if(filter === "active"){
            filteredList = tasksList.filter(task => !task.completed);
            setFilterAttributes("active");
        } else
        if(filter === "completed") {
            setFilterAttributes("completed");
            filteredList = tasksList.filter(task => task.completed);
        } else {
        setFilterAttributes("all");
        }

        filteredList.forEach(tasks => createListItem(tasks));
        localStorage.setItem('mylist', JSON.stringify(tasksList));  
        checkFilters();
        countActiveTasks();
        checkClearCompleted();
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
       const filter = getFilter();
       renderTasks(tasksList,filter);
    };    
};

function deleteTask (taskId) {
    tasksList = tasksList.filter(task => task.id != taskId);
    checkFilters();
    const filter = getFilter();
    renderTasks(tasksList,filter);

};

function changeTaskStatus(taskId) {
    tasksList = tasksList.map( task => {if (task.id === taskId) {return {...task, completed: !task.completed}} return task});
    const filter = getFilter();
    renderTasks(tasksList,filter);
};

