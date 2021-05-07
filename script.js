'use strict';

const DB_URL = 'db_cities.json';

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

const getData = async url => {
    const response = await fetch(url);
    return await response.json();
};

// возвращает промис с данными из базы по заданному языку
const getList = (language, url) => getData(url).then(response => response[language]);

// возвращает верстку города
const createCity = (name, link, count) => {
    return (
        `<div class="dropdown-lists__line">
            <div class="dropdown-lists__city" data-link="${link}">${name}</div>
            <div class="dropdown-lists__count">${count}</div>
        </div>`);
};

// формирует верстку списка городов по выбранной стране
const showCityList = selectCountry => {
    getList('RU', DB_URL)
        .then(data => {
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
    openList('.dropdown-lists__list--default');
    dropdownListDefault.firstElementChild.textContent = '';
    button.setAttribute("disabled", "disabled");
    button.setAttribute("target", "_blank");

    getList('RU', DB_URL)
        .then(data => {
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

                dropdownListDefault.firstElementChild.insertAdjacentElement('afterbegin', coutryBlock);
            });
        });
};

// формирует верстку списка городов при поисковом запросе
const searchCity = value => {

    const allCities = [];

    getList('RU', DB_URL)
        .then(response => {
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
                    filteredCities += createCity(name, link, count);
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
        selectCities.value = target.textContent;
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