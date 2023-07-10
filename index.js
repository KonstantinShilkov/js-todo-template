const ul = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const tasksStore = localStorage.getItem('mylist');
let tasksList = tasksStore === null? []: JSON.parse(tasksStore)
const footerStatus = document.querySelector('.footer');
const itemsLeft = document.querySelector('.todo-count');
const ulFilters = document.querySelector('.filters');
const clearCompletedButton = document.querySelector('.clear-completed');

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
    ulFilters.children[0].onclick = ()=> filterAllSelected();
    ulFilters.children[1].onclick = ()=> filterActiveSelected();
    ulFilters.children[2].onclick = ()=> filterCompletedSelected();
    clearCompletedButton.onclick = ()=> deleteCompletedTasks();

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

// function renderTasks() {
//     ul.innerHTML = '';    
//     Object.values(tasksList).forEach(tasks => createListItem(tasks));
//     localStorage.setItem('mylist', JSON.stringify(tasksList));  
//     filtersFootter();
//     countActiveTasks();
//     checkClearCompleted();
// };

function renderTasks(currentTasksList) {
        ul.innerHTML = '';    
        Object.values(currentTasksList).forEach(tasks => createListItem(tasks));
        localStorage.setItem('mylist', JSON.stringify(tasksList));  
        filtersFootter();
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
       renderTasks(tasksList);
    };    
};
renderTasks(tasksList);

function deleteTask (taskId) {
    tasksList = tasksList.filter(task => task.id != taskId);
    filtersFootter()
    renderTasks(tasksList);

};

// function changeTaskStatus(taskId) {
//     tasksList = tasksList.map( task=> {
//             if(task.id === taskId ){
//              task.completed = !task.completed
//              return task
//                 // return {...task , completed: !task.completed}
//             };    
//             return task
//     });  

//     renderTasks();
// };


function changeTaskStatus(taskId) {
    tasksList = tasksList.map( task => {if (task.id === taskId) {return {...task, completed: !task.completed}} return task});
    renderTasks(tasksList);
};

function filtersFootter() {
    tasksList.length != 0 ? footerStatus.setAttribute('style','display: block' ) : footerStatus.setAttribute('style','display: none' );
};

function countActiveTasks(){
    tasksListActive = tasksList.filter(task => task.completed === false);
    itemsLeft.firstChild.textContent = tasksListActive.length;
};

function filterAllSelected() {
    ulFilters.children[0].children[0].setAttribute("class","selected");
    ulFilters.children[1].children[0].setAttribute("class","");
    ulFilters.children[2].children[0].setAttribute("class","");
    renderTasks(tasksList)
};

function filterActiveSelected() {
    ulFilters.children[1].children[0].setAttribute("class","selected");
    ulFilters.children[0].children[0].setAttribute("class","");
    ulFilters.children[2].children[0].setAttribute("class","");
    tasksListActive = tasksList.filter(task => task.completed === false);
    renderTasks(tasksListActive)
};

function filterCompletedSelected() {
    ulFilters.children[2].children[0].setAttribute("class","selected");
    ulFilters.children[0].children[0].setAttribute("class","");
    ulFilters.children[1].children[0].setAttribute("class","");
    tasksListCompleted = tasksList.filter(task => task.completed === true);
    renderTasks(tasksListCompleted)
};

function checkClearCompleted() {
    tasksListCompleted = tasksList.filter(task => task.completed === true);
    if(tasksListCompleted.length !=0){
        clearCompletedButton.setAttribute('style','display: block' );
        clearCompletedButton.textContent = "Clear Completed";
    } else {
        clearCompletedButton.setAttribute('style','display: none')
    };
};   

function deleteCompletedTasks() {
    tasksList = tasksList.filter(task => task.completed === false);
    renderTasks(tasksList);
};

