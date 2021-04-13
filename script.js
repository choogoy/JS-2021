'use strict';

const books = document.querySelector('.books');
const booksItem = document.querySelectorAll('.book');
const title = document.querySelectorAll('h2 a');
const adv = document.querySelector('.adv');
const chaptersBook = document.querySelectorAll('ul');
const chaptersBook2 = booksItem[0].querySelectorAll('li');
const chaptersBook5 = booksItem[5].querySelectorAll('li');
const ulBook6 = booksItem[2].querySelector('ul');
const chaptersBook6 = ulBook6.querySelectorAll('li');
const newChapter = document.createElement('li');

// Восстановить порядок книг.
books.prepend(booksItem[1]);
books.append(booksItem[2]);
booksItem[3].before(booksItem[4]);

// Восстановить порядок глав во второй книге
chaptersBook2[3].after(chaptersBook2[6]);
chaptersBook2[4].before(chaptersBook2[8]);
chaptersBook2[9].after(chaptersBook2[2]);

// Восстановить порядок глав в пятой книге
chaptersBook5[2].before(chaptersBook5[9]);
chaptersBook5[4].after(chaptersBook5[2]);
chaptersBook5[7].after(chaptersBook5[5]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
newChapter.textContent = 'Глава 8: За пределами ES6';
ulBook6.append(newChapter);
ulBook6.append(chaptersBook6[9]);

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
title[4].textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
adv.remove();

// Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";