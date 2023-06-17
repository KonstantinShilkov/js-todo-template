
const ul = document.querySelector('.todo-list');

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
    // button.setAttribute('onclick','deleteTask()');

    label.textContent = item.text; 
    li.setAttribute('data-id',item.id );
    
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

const tasksStore = localStorage.getItem('mylist');
const tasksList = tasksStore === null? []: JSON.parse(tasksStore)
renderTasks();

const input = document.querySelector('.new-todo');

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
    tasksList.push({id: randomId(1 , 10000), text: newTask, completed: false });
       localStorage.setItem('mylist', JSON.stringify(tasksList));
       cleanInput();
       renderTasks();
    };    
};

// const deleteButtonsArray = document.querySelectorAll('.destroy'); 
const deleteButtonsCollection = document.getElementsByClassName('destroy');

// const deleteButtonsCollection = Array.prototype.slice.call(deleteButtons);
const deleteButtonsArray = Array.from(deleteButtonsCollection);
    
deleteButtonsArray.forEach(button => {
    button.addEventListener('click', function (){
        const clickedTask = button.parentNode.parentNode;
        clickedTask.remove();
        const clickedTaskId = button.parentNode.parentNode.dataset.id;
        const clickedTaskIndex = tasksList.findIndex(task => task.id == clickedTaskId);
        tasksList.splice(clickedTaskIndex,1);
        localStorage.setItem('mylist', JSON.stringify(tasksList));
    });
});
    // function deleteTask () {
    //     dinamoArray().forEach(button => {
    //             button.addEventListener('click', function() {
    //                 const clickedTask = button.parentNode.parentNode
    //                 clickedTask.remove()
    //                 const clickedTaskId = button.parentNode.parentNode.dataset.id
    //                 const clickedTaskIndex = tasksList.findIndex(task => task.id == clickedTaskId);
    //                 console.log(clickedTaskIndex)
    //                 tasksList.splice(clickedTaskIndex,1);
    //                 localStorage.setItem('mylist', JSON.stringify(tasksList));
                
    //             });
    //         });
    // };
// 