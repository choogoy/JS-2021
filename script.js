'use strict';

const register = document.getElementById('register');
const login = document.getElementById('login');
const username = document.getElementById('username');
const list = document.getElementById('list');
const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const users = JSON.parse(localStorage.getItem('users')) || [];

const saveList = () => localStorage.setItem('users', JSON.stringify(users));

const User = function(firstName, lastName, login, password, regDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.password = password;
    this.regDate = regDate;
};

const addZero = function(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
};

function checkName() {
    let userName;
    do {
        userName = prompt('Введите Ваше имя и фамилию');
    } while (userName === '' || userName.split(' ').length > 2 || !userName.includes(" "));

    return userName;
}

function renderDate(date) {
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} г., ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
}

function registerUser() {
    const name = checkName(),
        login = prompt('Введите логин'),
        password = prompt('Введите пароль');

    let fullname = name.split(' ');
    let newUser = new User(fullname[0], fullname[1], login, password, renderDate(new Date()));
    users.push(newUser);
}

function loginUser() {
    const login = prompt('Введите логин'),
        password = prompt('Введите пароль');

    let flag = false;
    
    users.forEach(user => {
        if (user.login === login && user.password === password) {
            username.textContent = user.firstName;
            flag = true;
            return flag;
        }
    });

    if (!flag) {
        alert('Пользователь не найден');
    }
    
}

function renderList() {

    list.textContent = '';

    saveList();

    if (users.length === 0) {
        username.textContent = 'Аноним';
    }

    users.forEach((user, index) => {
        const li = document.createElement('li');

        li.insertAdjacentHTML('afterbegin', `
            <div style="max-width: 600px; padding: 10px; background: #d9d9d9; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
                <div>Имя: ${user.firstName}, фамилия: ${user.lastName}, зарегистрирован: ${user.regDate}</div>
                <button class="delete" style="margin-left: 10px">x</button>
            </div>
        `);

        list.append(li);

        const deleteBtn = li.querySelector('.delete');

        deleteBtn.addEventListener('click', function() {
            users.splice(index, 1);
            renderList();
        });

    });
}

register.addEventListener('click', event => {
    event.preventDefault();
    registerUser();
    renderList();
});

login.addEventListener('click', event => {
    event.preventDefault();
    loginUser();
});

renderList();