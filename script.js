'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.text = function() {
    return prompt('Введите текст', 'Новый блок');
  };
  this.createBlock = function() {
    let newElem;

    if ( this.selector[0] === '.' ) {
      newElem = document.createElement('div');
      newElem.className = `${this.selector.slice(1)}`;
    }

    if ( this.selector[0] === '#' ) {
      newElem = document.createElement('p');
      newElem.id = `${this.selector.slice(1)}`;
    }

      
    newElem.textContent = this.text();
    newElem.style.cssText = `width: ${this.width}; height: ${this.height}; background-color: ${this.bg}; font-size: ${this.fontSize}; display: flex; align-items: center; justify-content: center; margin: 15px;`;
    document.body.append(newElem);
  };
}

const newBlock = new DomElement("#block", "100px", "150px", "red", "18px");
const newBlock2 = new DomElement(".block", "200px", "250px", "green", "16px");

newBlock.createBlock();
newBlock2.createBlock();