'use strict';

const input = document.getElementById('input');
const text = document.getElementById('text');

text.style.cssText = 'background-color: beige; height: 20px';

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

const printText = value => text.textContent = value;

const showTextDebounce = debounce(printText, 300);

input.addEventListener('input', () => {
  showTextDebounce(input.value);
});