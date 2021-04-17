'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todolist')) || [];

const saveList = () => localStorage.setItem('todolist', JSON.stringify(todoData));

const render = function() {
    saveList();
    headerInput.value = '';
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach((item, index) => {
        const li = document.createElement('li');
        
        li.classList.add('todo-item');
        
        li.insertAdjacentHTML('afterbegin', `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoCompleteBtn = li.querySelector('.todo-complete');
        const todoRemoveBtn = li.querySelector('.todo-remove');

        todoCompleteBtn.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        todoRemoveBtn.addEventListener('click', function() {
            todoData.splice(index, 1);
            render();
        });

    });

};

todoControl.addEventListener('submit', event => {
    event.preventDefault();

    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
    }

    render();
});

render();