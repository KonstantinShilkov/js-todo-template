// 1 Tast add new task

// const ul = document.getElementById('tasklist');
const ul = document.querySelector('.todo-list')
// найти по классу и убрать id ?

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

// соединяем с объектом
    label.textContent = item.text; //взял текст контект так как innerHTML вносится с тегами и перезаписвает код, а textContent только добавляет текст
    li.setAttribute('id',item.id );
    // li.setAttribute('class', item.completed); пока что не нужно , при подтверждении выполнения дела

    ul.append(li);
    li.append(div);
    div.append(input);
    div.append(label);
    div.append(button);

};

const task = { id: "1", text: "выучить html", completed: true };

createListItem(task);