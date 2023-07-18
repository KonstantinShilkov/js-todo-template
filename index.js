const ul = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const tasksStore = localStorage.getItem('mylist');
let tasksList = tasksStore === null? []: JSON.parse(tasksStore)
const footerStatus = document.querySelector('.footer');
const itemsLeft = document.querySelector('.todo-count');
const ulFilters = document.querySelector('.filters');
const clearCompletedButton = document.querySelector('.clear-completed');
// const tasksListActive = tasksList.filter(task => !task.completed);
// const tasksListCompleted = tasksList.filter(task => task.completed);

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

function renderTasks(currentTasksList) {
        ul.innerHTML = '';    
        currentTasksList.forEach(tasks => createListItem(tasks));
        localStorage.setItem('mylist', JSON.stringify(tasksList));  
        checkFilters();
        countActiveTasks();
        checkClearCompleted();
       
    //     if (url.includes("active")){
    //         filterActiveSelected()
    //         renderTasks(tasksListActive);
    //     } else 
    //         if (url.includes("completed")){
    //             filterCompletedSelected()
    //             renderTasks(tasksListCompleted);
    //     } 
    //     else (filterAllSelected(),renderTasks(tasksList))
    };
    
function renderTasksByUrl() {
    const url = window.location.href;
    if(url.includes("active")){
        setFilterAttributes("active")
    } else
    if(url.includes("completed")) {
        setFilterAttributes("completed")
    } else
    setFilterAttributes("all")
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
       renderTasksByUrl()
    //    renderTasks(tasksList);
    };    
};
// renderTasks(tasksList);

function deleteTask (taskId) {
    tasksList = tasksList.filter(task => task.id != taskId);
    checkFilters();
    renderTasksByUrl()
    // renderTasks(tasksList);

};

function changeTaskStatus(taskId) {
    tasksList = tasksList.map( task => {if (task.id === taskId) {return {...task, completed: !task.completed}} return task});
    // renderTasks(tasksList);
    renderTasksByUrl()
};

function checkFilters() {
    tasksList.length != 0 ? footerStatus.setAttribute('style','display: block' ) : footerStatus.setAttribute('style','display: none' );
};

function countActiveTasks(){
    tasksListActive = tasksList.filter(task => !task.completed);
    itemsLeft.firstChild.textContent = tasksListActive.length;
};


function setFilterAttributes(filter) {
    let filteredList = tasksList;

    const isAll = filter === "all"
    const isActive = filter === "active";
    const isCompleted = filter === "completed";

    ulFilters.children[0].children[0].setAttribute("class",isAll? "selected": "");
    ulFilters.children[1].children[0].setAttribute("class",isActive? "selected": "");
    ulFilters.children[2].children[0].setAttribute("class",isCompleted? "selected": "");

    if (isActive) {
        filteredList = tasksList.filter(task => !task.completed);
    };

    if (isCompleted) {
        filteredList = tasksList.filter(task => task.completed);
    }

    renderTasks(filteredList)

};

function checkClearCompleted() {
    tasksListCompleted = tasksList.filter(task => task.completed);
    if(tasksListCompleted.length !=0){
        clearCompletedButton.setAttribute('style','display: block' );
        clearCompletedButton.textContent = "Clear Completed";
    } else {
        clearCompletedButton.setAttribute('style','display: none');
    };
};   

function deleteCompletedTasks() {
    tasksList = tasksList.filter(task => !task.completed);
    // renderTasksByUrl()
    // renderTasks(tasksList);
    renderTasksByUrl()
};
renderTasksByUrl()



// function urlCheck (filter) {
//     let filteredList = tasksList;

//     const isActive = filter === "active";
//     const isCompleted = filter === "completed";

//     if (isActive) {
//         filteredList = tasksList.filter(task => !task.completed);
//     };

//     if (isCompleted) {
//         filteredList = tasksList.filter(task => task.completed);
//     }

//     renderTasks(filteredList);
// }