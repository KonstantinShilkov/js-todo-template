
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
// event к input ( положить туда функцию); проверить в консоле event

function cleanInput() {
    input.value = "";
};

function getId() {
    const newId = tasksList.length + 1;
    // поискать уникальнй id кроме length
    return newId
};

function createNewTask() {
    const newTask = input.value;
    if (newTask !== ""|| null) {
       tasksList.push({id: getId(), text: newTask, completed: false });
       localStorage.setItem('mylist', JSON.stringify(tasksList));
       //
       cleanInput();
       renderTasks()
    //    inputTasks();
    };
    
};

renderTasks();

// localStorage.clear(tasksList);
   
    
