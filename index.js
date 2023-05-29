
const ul = document.querySelector('.todo-list')

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
    
    const cond = item.completed == true? "completed" : "" ; //Добавил проверку , чтоб присваивать class = completed или "пустоту" (true/false ) и строка закчеркивалась или нет
    li.setAttribute('class',cond); 

    ul.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

};

 const tasksList = [
     { id: "1", text: "выучить html", completed: true },
     { id: "2", text: "выучить css", completed: true },
     { id: "3", text: "выучить js", completed: false },
     { id: "4", text: "выучить фреймворк", completed: false },
     { id: "5", text: "написать несколько учебных проектов", completed: false },
     { id: "6", text: "пройти собеседование", completed: false },
     { id: "7", text: "получить работу", completed: false }
 ];
    

function renderTasks() {

    // нашел пару разных вариантов, первый и третий как буд то одинаковые? До конца не понимаю есть ли разница между всеми?

    // *1     for (const tasks of tasksList.values (tasksList)){
    //         createListItem(tasks)
    // };

    // * 2     Object.values(tasksList).forEach(tasks => createListItem(tasks));

  //* 3 Наверное этот самый понятный и простой для перебора
    for (const tasks of tasksList){
        createListItem(tasks)
    }
};

renderTasks();