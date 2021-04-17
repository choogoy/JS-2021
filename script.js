'use strict';

let position = {
  top: 0,
  left: 0,
};

let newElem = document.createElement('div');
newElem.style.cssText = `position: absolute; width: 100px; height: 100px; background-color: red; display: flex; align-items: center; justify-content: center;`;
document.body.style.cssText = `margin: 0; overflow: hidden`;
document.body.append(newElem);

function move(event) {

  if (event.key === 'ArrowRight' && position.left + newElem.offsetWidth < window.innerWidth) {
    position.left += 10;
  }

  if (event.key === 'ArrowLeft' && position.left > 0) {
    position.left -= 10;
  }

  if (event.key === 'ArrowUp' && position.top > 0) {
    position.top -= 10;
  }

  if (event.key === 'ArrowDown' && position.top + newElem.offsetHeight < window.innerHeight) {
    position.top += 10;
  }
  
  return position;
}

document.addEventListener('keydown', function(event) {
  move(event);
  newElem.style.top = position.top + "px";
  newElem.style.left = position.left + "px";
});