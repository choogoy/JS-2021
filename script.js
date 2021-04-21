'use strict';

const newYear = new Date('1 January 2022');

const greetings = {
  morning: "Доброе утро",
  afternoon: "Добрый день",
  evening: "Добрый вечер",
  nigth: "Доброй ночи",
};
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']; // вспомогательный массив с днями недели
const days = ['день', 'дня', 'дней']; // вспомогательный массив с возможными окончаниями слов

const addZero = num => {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
};

// функция изменяет окончание слова в зависимости от числа
const ending = function(num, arr) {
  return arr[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
};

const renderText = () => {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const div = document.createElement('div');

  const renderGreetings = () => {
    if (currentHours >= 0 && currentHours < 6) {
      return greetings.nigth;
    }
    if (currentHours >= 6 && currentHours < 12) {
      return greetings.morning;
    }
    if (currentHours >= 12 && currentHours < 18) {
      return greetings.afternoon;
    }
    if (currentHours >= 18 && currentHours < 24) {
      return greetings.evening;
    }
  } ;
  
  const renderTime = () => {
    let hours = currentHours > 12 ? currentHours - 12 : currentHours;
    let AMPM = currentHours > 12 ? 'PM' : 'AM'; 
    return `${addZero(hours)}:${addZero(currentDate.getMinutes())}:${addZero(currentDate.getSeconds())} ${AMPM}`;
  };
  
  const newYearsRemaining = () => Math.ceil((newYear.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);

    div.innerHTML = ` <p>${renderGreetings()}!</p>
                    <p>Сегодня: ${week[currentDate.getDay()]}</p>
                    <p>Текущее время: ${renderTime()}</p>
                    <p>До нового года осталось ${newYearsRemaining()} ${ending(newYearsRemaining(), days)}</p>`;
  
  document.body.textContent = '';
  document.body.append(div);
};

setInterval(renderText, 1000);