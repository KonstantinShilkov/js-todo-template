
const ul = document.querySelector('.todo-list')

function createListItem(item) {

    const li  = document.createElement('li');
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const button = document.createElement('button');

    // li.setAttribute('class');
    div.setAttribute('class', 'view');
    input.setAttribute('class','toggle');
    input.setAttribute('type','checkbox'); 
    button.setAttribute('class','destroy');


    label.textContent = item.text; 
    li.setAttribute('id',item.id );
    // li.setAttribute('class', item.completed); 

    ul.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

};

const task = { id: "1", text: "выучить html", completed: true };

createListItem(task);
