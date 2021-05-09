'use strict';

// const DB_URL = 'db_cities.json'; // локальная база
const DB_URL = 'https://cities-fccf0-default-rtdb.firebaseio.com/DB.json'; // json-сервер

const main = document.querySelector('.main');
const selectCities = document.getElementById('select-cities');
const dropdownLists = document.querySelectorAll('.dropdown-lists__list');
const label = document.querySelector('.label');
const closeButton = document.querySelector('.close-button');
const dropdownListDefault = document.querySelector('.dropdown-lists__list--default');
const dropdownListSelect = document.querySelector('.dropdown-lists__list--select');
const dropdownListAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
const button = document.querySelector('.button');

button.setAttribute("disabled", "disabled");

const closeLists = () => dropdownLists.forEach(list => list.style.display = 'none'); //скрывает все листы
const openList = selector => document.querySelector(selector).style.display = 'block'; //открывает выбранный лист

// записываем куку
const setCookie = (name, value, options = {}) => {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
};

// считываем куку
const getCookie = name => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

// считываем localStorage
const getStorage = local => {
    const getData = JSON.parse(localStorage.getItem(local)) || [];
    return getData;
};

// записываем в localStorage
const setStorage = (local, data) => localStorage.setItem(local, JSON.stringify(data));

const question = () => prompt('Введите локаль (RU, EN или DE)', 'RU');

const start = () => {

    let local = '';

    if (!getCookie('local')) {
        console.log('куки нет');
        local = question();
        setCookie('local', local);
    } else {
        console.log('кука есть');
        local = getCookie('local');
    }

    return local;

};

const countries = {
    'RU': 'Россия',
    'DE': 'Deutschland',
    'EN': 'United Kingdom',
};

const local = start(); // получаем локаль

// анимация
const animate = ({ timing, draw, duration }) => {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
  
        if (timeFraction > 1) {
            timeFraction = 1;
        }
  
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);
  
        draw(progress); // отрисовать её
  
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
  
    });
  };

//покдлючаем firebase
const firebaseInit = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyB2fYuNszHf2hU39FbFq6-REbbUom0zm4w",
        authDomain: "cities-fccf0.firebaseapp.com",
        projectId: "cities-fccf0",
        databaseURL: "https://cities-fccf0-default-rtdb.firebaseio.com/",
        storageBucket: "cities-fccf0.appspot.com",
        messagingSenderId: "443902811100",
        appId: "1:443902811100:web:49727b0ffb0ade11328d19",
        measurementId: "G-8Z0HLXEJSV"
    };
    
    firebase.initializeApp(firebaseConfig);
};

firebaseInit();

const loadSpinner = () => {
    const spinner = document.createElement('section');
    const spinnerStyle = document.createElement('style');

    spinner.insertAdjacentHTML('afterbegin', `  
      <div class='sk-fading-circle'>
          <div class='sk-circle sk-circle-1'></div>
          <div class='sk-circle sk-circle-2'></div>
          <div class='sk-circle sk-circle-3'></div>
          <div class='sk-circle sk-circle-4'></div>
          <div class='sk-circle sk-circle-5'></div>
          <div class='sk-circle sk-circle-6'></div>
          <div class='sk-circle sk-circle-7'></div>
          <div class='sk-circle sk-circle-8'></div>
          <div class='sk-circle sk-circle-9'></div>
          <div class='sk-circle sk-circle-10'></div>
          <div class='sk-circle sk-circle-11'></div>
          <div class='sk-circle sk-circle-12'></div>
      </div>`);

    spinnerStyle.insertAdjacentHTML('afterbegin', `
      .sk-fading-circle {
          width: 4em;
          height: 4em;
          position: relative;
          margin: 10px auto;
      }
      .sk-fading-circle .sk-circle {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
      }
      .sk-fading-circle .sk-circle:before {
          content: "";
          display: block;
          margin: 0 auto;
          width: 15%;
          height: 15%;
          background-color: #337ab7;
          border-radius: 100%;
          -webkit-animation: sk-fading-circle-delay 1.2s infinite ease-in-out both;
                  animation: sk-fading-circle-delay 1.2s infinite ease-in-out both;
      }
      .sk-fading-circle .sk-circle-2 {
          transform: rotate(30deg);
      }
      .sk-fading-circle .sk-circle-3 {
          transform: rotate(60deg);
      }
      .sk-fading-circle .sk-circle-4 {
          transform: rotate(90deg);
      }
      .sk-fading-circle .sk-circle-5 {
          transform: rotate(120deg);
      }
      .sk-fading-circle .sk-circle-6 {
          transform: rotate(150deg);
      }
      .sk-fading-circle .sk-circle-7 {
          transform: rotate(180deg);
      }
      .sk-fading-circle .sk-circle-8 {
          transform: rotate(210deg);
      }
      .sk-fading-circle .sk-circle-9 {
          transform: rotate(240deg);
      }
      .sk-fading-circle .sk-circle-10 {
          transform: rotate(270deg);
      }
      .sk-fading-circle .sk-circle-11 {
          transform: rotate(300deg);
      }
      .sk-fading-circle .sk-circle-12 {
          transform: rotate(330deg);
      }
      .sk-fading-circle .sk-circle-2:before {
          -webkit-animation-delay: -1.1s;
                  animation-delay: -1.1s;
      }
      .sk-fading-circle .sk-circle-3:before {
          -webkit-animation-delay: -1s;
                  animation-delay: -1s;
      }
      .sk-fading-circle .sk-circle-4:before {
          -webkit-animation-delay: -0.9s;
                  animation-delay: -0.9s;
      }
      .sk-fading-circle .sk-circle-5:before {
          -webkit-animation-delay: -0.8s;
                  animation-delay: -0.8s;
      }
      .sk-fading-circle .sk-circle-6:before {
          -webkit-animation-delay: -0.7s;
                  animation-delay: -0.7s;
      }
      .sk-fading-circle .sk-circle-7:before {
          -webkit-animation-delay: -0.6s;
                  animation-delay: -0.6s;
      }
      .sk-fading-circle .sk-circle-8:before {
          -webkit-animation-delay: -0.5s;
                  animation-delay: -0.5s;
      }
      .sk-fading-circle .sk-circle-9:before {
          -webkit-animation-delay: -0.4s;
                  animation-delay: -0.4s;
      }
      .sk-fading-circle .sk-circle-10:before {
          -webkit-animation-delay: -0.3s;
                  animation-delay: -0.3s;
      }
      .sk-fading-circle .sk-circle-11:before {
          -webkit-animation-delay: -0.2s;
                  animation-delay: -0.2s;
      }
      .sk-fading-circle .sk-circle-12:before {
          -webkit-animation-delay: -0.1s;
                  animation-delay: -0.1s;
      }
      
      @-webkit-keyframes sk-fading-circle-delay {
          0%, 39%, 100% {
          opacity: 0;
          }
          40% {
          opacity: 1;
          }
      }
      
      @keyframes sk-fading-circle-delay {
          0%, 39%, 100% {
          opacity: 0;
          }
          40% {
          opacity: 1;
          }
      }`);

    document.head.append(spinnerStyle);

    return spinner;
};

const getData = async url => {
    const response = await fetch(url);
    return await response.json();
};

// возвращает промис с данными из базы по заданному языку
const getList = (language, url) => {

    if (getStorage(language).length) {
        return new Promise(resolve => {
            if (getStorage(language).length) {
                resolve(getStorage(language));
            }
        }).then(getStorage(language));
    } else {
        return getData(url).then(response => {
            setStorage(language, response[language]);
            return response[language];
        });
    }

};

// возвращает верстку города
const createCity = (name, link, count) => {
    return (
        `<div class="dropdown-lists__line">
            <div class="dropdown-lists__city" data-link="${link}">${name}</div>
            <div class="dropdown-lists__count">${count}</div>
        </div>`);
};

//выделяет совпадение при вводе в инпут
const cityHighlightning = (name, link, count, value) => {

    if (name.toLowerCase().indexOf(value) === 0) {
        return (
            `<div class="dropdown-lists__line">
                <div class="dropdown-lists__city" data-link="${link}">
                    <b style="color: red;">${name.slice(0, value.length)}</b>${name.slice(value.length)}
                </div>
                <div class="dropdown-lists__count">${count}</div>
            </div>`);
    }

    if (name.toLowerCase().indexOf(value) > 0) {
        return (
            `<div class="dropdown-lists__line">
                <div class="dropdown-lists__city" data-link="${link}">
                    ${name.slice(0, name.toLowerCase().indexOf(value))}<b style="color: red;">${name.slice(name.toLowerCase().indexOf(value), name.toLowerCase().indexOf(value) + value.length)}</b>${name.slice(name.toLowerCase().indexOf(value) + value.length)}
                </div>
                <div class="dropdown-lists__count">${count}</div>
            </div>`);
    }

};

// формирует верстку списка городов по выбранной стране
const showCityList = selectCountry => {
    dropdownListSelect.firstElementChild.insertAdjacentElement('afterbegin', loadSpinner());
    getList(local, DB_URL)
        .then(data => {
            dropdownListSelect.firstElementChild.textContent = '';
            animate({
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    dropdownListSelect.style.transform = `translateX(${(1 - progress) * 100}%)`;
                }
            });
            data.forEach(item => {
                const { country, count, cities } = item;

                if (country === selectCountry) {

                const coutryBlock = document.createElement('div');
                coutryBlock.classList.add('dropdown-lists__countryBlock');

                let cityBlock = '';

                cities.sort((a,b) => b.count - a.count).forEach(({ name, link, count }) => cityBlock += createCity(name, link, count));

                coutryBlock.insertAdjacentHTML('afterbegin', `
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country">${country}</div>
                        <div class="dropdown-lists__count">${count}</div>
                    </div>
                    ${cityBlock}`);

                dropdownListSelect.firstElementChild.insertAdjacentElement('afterbegin', coutryBlock);

            }
            });
        });
};

// формирует верстку списка ТОП3 городов по каждой стране
const startList = () => {

    closeLists();

    dropdownListDefault.style.transform = 'traslateX(-100%)';
    openList('.dropdown-lists__list--default');
    dropdownListDefault.firstElementChild.textContent = '';
    dropdownListDefault.firstElementChild.insertAdjacentElement('afterbegin', loadSpinner());
    button.setAttribute("disabled", "disabled");
    button.setAttribute("target", "_blank");

    getList(local, DB_URL)
        .then(response => {

            let array = [];
            let i = 1;

            response.forEach(item => {
                const { country } = item;

                if (country === countries[local]) {
                    array[0] = item;
                } else {
                    array[i] = item;
                    i++;
                }
            });

            return array;
        })
        .then(data => {
            dropdownListDefault.firstElementChild.textContent = '';
            animate({
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    dropdownListDefault.style.transform = `translateX(-${(1 - progress) * 100}%)`;
                }
            });
            data.forEach(({ country, count, cities }) => {
                let cityBlock = '';
                const coutryBlock = document.createElement('div');
                coutryBlock.classList.add('dropdown-lists__countryBlock');

                cities.sort((a,b) => b.count - a.count).forEach(({ name, link, count }, index) => {
                    if (index < 3) {
                        cityBlock += createCity(name, link, count);
                    }
                });

                coutryBlock.insertAdjacentHTML('afterbegin', `
                    <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country">${country}</div>
                        <div class="dropdown-lists__count">${count}</div>
                    </div>
                    ${cityBlock}`);

                dropdownListDefault.firstElementChild.insertAdjacentElement('beforeend', coutryBlock);
            });
        });
};

// формирует верстку списка городов при поисковом запросе
const searchCity = value => {
    const allCities = [];
    dropdownListAutocomplete.firstElementChild.insertAdjacentElement('afterbegin', loadSpinner());
    getList(local, DB_URL)
        .then(response => {
            dropdownListAutocomplete.firstElementChild.textContent = '';
            response.forEach(({ cities }) => allCities.push(...cities));
            return allCities;
        })
        .then(array => {
            const filtered = array.sort((a,b) => b.count - a.count).filter(city => {
                if (city.name.toLowerCase().includes(value.toLowerCase())) {
                    return city;
                }
            });

            if (filtered.length) {
                let filteredCities = '';
                filtered.forEach(({ name, link, count }) => {
                    filteredCities += cityHighlightning(name, link, count, value.toLowerCase());
                });
                dropdownListAutocomplete.firstElementChild.insertAdjacentHTML('afterbegin', filteredCities);
            } else {
                dropdownListAutocomplete.firstElementChild.innerHTML = '<div style="padding: 10px">Ничего не найдено</div>';
            }

        });
};

closeLists(); // изначально все листы скрыты

// обработчик по клику на общего родителя всех элементов
main.onclick = event => {

    const target = event.target;
    const line = target.closest('.dropdown-lists__total-line');

    // если кликнули по инпуту => раскрываем лист с ТОП3 городами
    if (target.closest('#select-cities')) {
        startList();
    }

    // если кликнули по стране в листе
    if (line) {
        if (target.closest('.dropdown-lists__list--select')) {
            startList(); // если кликнули по стране в листе с общим списком городов то переходим на стартовый лист
        } else {
            dropdownListSelect.style.transform = 'traslateX(100%)';
            document.querySelector('.dropdown-lists').style.overflow = 'hidden';
            // иначе выводим общий список городов по стране
            const country = line.children[0].textContent;
            dropdownListSelect.firstElementChild.textContent = '';
            closeLists();
            openList('.dropdown-lists__list--select');
            showCityList(country);
        }
    }

    // если кликнули по городу или стране в любом списке => выводим значение в инпут и показываем крестик (лейбл скрываем)
    if (target.closest('.dropdown-lists__country') || target.closest('.dropdown-lists__city')) {
        label.style.display = 'none';
        selectCities.value = target.textContent.trim();
        closeButton.style.display = 'block';

        // если у таргета есть дата-атрибут со сслыкой то добавляем ссылку в кпоку "Перейти"
        if (target.dataset.link) {
            button.removeAttribute("disabled");
            button.setAttribute("href", target.dataset.link);
        } else { // иначе блокируем кнопку
            button.setAttribute("disabled", "disabled");
            button.setAttribute("href", "#");
        }
    }

    // если нажимаем на крестик то все листы скрываем, убираем крестик, блокируем кнопу, все значения стираем
    if (target.closest('.close-button')) {
        closeLists();
        closeButton.style.display = 'none';
        selectCities.value = '';
        label.style.display = 'block';
        button.setAttribute("disabled", "disabled");
        button.setAttribute("href", "#");
    }

};

// обработчик по вводу в инпут
selectCities.addEventListener('input',  event => {
    const inputValue = event.target.value;
    
    // если в инпуте введены символы то формируем список городов
    if (inputValue.trim()) {
        closeLists();
        openList('.dropdown-lists__list--autocomplete');
        dropdownListAutocomplete.firstElementChild.textContent = '';
        label.style.display = 'none';
        searchCity(inputValue);
    } else { // иначе показываем стартовый лист
        label.style.display = 'block';
        button.setAttribute("disabled", "disabled");
        button.setAttribute("href", "#");
        startList();
    }

});