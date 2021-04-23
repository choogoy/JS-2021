'use strict';

const button = document.getElementById('start');
const reset = document.getElementById('cancel');
const newBlock = document.querySelector('.box');
newBlock.style.cssText = `width: 100px; height: 100px; background-color: green; position: absolute; top: 40px`;

let i = 0;
let requestAnimate;

const animate = () => {
  requestAnimate = requestAnimationFrame(animate);
  i++;
  newBlock.style.left = `${i}px`;
};

let flag = false; // нет анимации

button.addEventListener('click', () => {
  if (!flag) {
    requestAnimate = requestAnimationFrame(animate);
    flag = true;
  } else {
    flag = false;
    cancelAnimationFrame(requestAnimate);
  }
});

reset.addEventListener('click', () => {
  cancelAnimationFrame(requestAnimate);
  i = 0;
  flag = false;
  newBlock.style.left = `10px`;
});