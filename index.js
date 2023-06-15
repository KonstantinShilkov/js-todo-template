
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

renderTasks();

const deleteButtons = document.querySelectorAll('.destroy'); // рассказать как я не мог получить колекцию node =)))
   
    deleteButtons.forEach(button => {
        button.addEventListener('click', function deleteTask (){
           
             // const clickedButtonId = button.parentNode.parentNode.dataset.id
            console.log(tasksList)
        
            const clickedButton = button.parentNode.parentNode
            clickedButton.remove()
            const clickedButtonId = button.parentNode.parentNode.dataset.id
            const clickedButtonIndex = tasksList.findIndex(task => task.id == clickedButtonId);
            console.log(clickedButtonIndex)
            tasksList.splice(clickedButtonIndex,1);
            localStorage.setItem('mylist', JSON.stringify(tasksList));
        
            // console.log(clickedButton)
            // console.log(clickedButtonId)
            // console.log(clickedButtonIndex)
            // console.log(clickedLi)




            //   const clickedLi = clickedButton.parentNode.parentNode
            //   const clickedId = console.log(clickedLi)


        });

    })