'use strict';

const debounce = (callback, time) => {
    let lastCall = 0;
    let lastCallTimer = 0;
    return (...args) => {
      const prevCall = lastCall;
      lastCall = Date.now();
      if (prevCall && ((lastCall - prevCall) < time)) {
        clearInterval(lastCallTimer);
      }
      lastCallTimer = setTimeout(() => callback(...args), time);
    };
};

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todolist')));
    }

    addToStorage() {
        localStorage.setItem('todolist', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
        this.handler();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`);
      
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            this.input.value = '';
            alert('пустое дело добавить нельзя!');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // по ключу найти элемент и удалить из MAP, после этого сделать рендер
    deleteItem(key) {
        this.todoData.delete(key);
        this.render();
    }

    // изменяем элемент списка
    editItem(li) {
        li.setAttribute("contenteditable", true);

        this.todoData.forEach(elem => {
            const printText = (elem, event) => {
                elem.value = event.target.innerText;
                this.addToStorage();
            };

            const showTextDebounce = debounce(printText, 300);

            if (elem.key === li.key) {
                li.addEventListener('input', event => showTextDebounce(elem, event));
            }
        });
    }

    // перебрать forEach todoData и найти элемент с ключем на который мы кликнули и поменять значение complete
    completedItem(key) {
        this.todoData.forEach(elem => {
            if (elem.key === key) {
                elem.completed = !elem.completed;
            }
        });
        this.render();
    }

    // метод который определяет на какую кнопку кликнули (корзиза или галочка) и вызвать один из методов delete/complete
    handler() {
        const todoContainer = document.querySelector('.todo-container');
        
        todoContainer.onclick = event => {
            const editItem = event.target.closest('.todo-edit');
            const deleteItem = event.target.closest('.todo-remove');
            const completeItem = event.target.closest('.todo-complete');
            const todoItem = event.target.closest('.todo-item');

            if (deleteItem) {
                this.deleteItem(todoItem.key, todoItem);
            }
            
            if (completeItem) {
                this.completedItem(todoItem.key, todoItem);
            }

            if (editItem) {
                this.editItem(todoItem);
            }
        };
    }

    init() { 
        this.render();
        this.form.addEventListener('submit', this.addTodo.bind(this));
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();