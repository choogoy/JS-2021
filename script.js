'use strict';

const changeBtn = document.getElementById('change');
const color = document.getElementById('color');

const randomColor = () => {
  let r = Math.floor(Math.random() * (256)),
      g = Math.floor(Math.random() * (256)),
      b = Math.floor(Math.random() * (256));
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
};

changeBtn.addEventListener('click', () => {
  const random = randomColor();
  color.textContent = random;
  color.style.color = 'white';
  changeBtn.style.color = random;
  document.body.style.backgroundColor = random;
});
