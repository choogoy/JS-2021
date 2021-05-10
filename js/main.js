'use strict';

const DB = 'DB/dbHeroes.json';

const content = document.querySelector('.content');
const search = document.querySelector('.search');
const searchText = document.querySelector('.search-text');
const movies = document.getElementById('movies');
const filter = document.getElementById('filter');

const getData = async url => {
    const response = await fetch(url);
    return await response.json();
};

const createCard = data => {
    const {
        name,
        realName,
        species,
        citizenship,
        actors,
        gender,
        movies,
        birthDay,
        deathDay,
        status,
        photo
    } = data;

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-img">
            <img src="../DB/${photo}" alt="${name}">
        </div>
        <div class="card-info">
            <p>name: <span>${name}</span></p>
            ${ realName ? `<p>realName: <span>${realName}</span></p>` : '' }
            ${ species ? `<p>species: <span>${species}</span></p>` : '' }
            ${ citizenship ? `<p>citizenship: <span>${citizenship}</span></p>` : '' }
            <p>actors: <span>${actors}</span></p>
            <p>gender: <span>${gender}</span></p>
            ${ movies ? `<p>movies: <span>${movies.join(', ')}</span></p>` : ''}
            ${ birthDay ? `<p>birthDay: <span>${birthDay}</span></p>` : '' }
            ${ deathDay ? `<p>deathDay: <span>${deathDay}</span></p>` : '' }
            <p>status: <span>${status}</span></p>
        </div>
        `;

    return card;
};

const renderCards = movie => {

    let cards = new Set();

    getData(DB)
        .then(data => {

            content.textContent = '';
            searchText.textContent = '';

            data.forEach(item => {
                if (item.movies) {
                    item.movies.forEach(film => {
                        if (film === movie) {
                            cards.add(item);
                        }
                    });
                }
            });

            [...cards].forEach(card => content.insertAdjacentElement('beforeend', createCard(card)));

        });

};

const getMovieList = data => {
    let films = new Set();

    data.forEach(item => {
        if (item.movies) {
            item.movies.forEach(movie => films.add(movie));
        }
    });

    [...films].sort().forEach(film => {
        const option = document.createElement('option');
        option.textContent = film;
        option.value = film;
        movies.insertAdjacentElement('beforeend', option);
    });

};

const renderSearchRequest = search => {
    content.textContent = '';
    searchText.textContent = '';
    filter.value = '';
    movies.value = '';
    fetch(DB)
        .then(response => response.json())
        .then(array => {
            array.forEach(item => {
                if (item.movies) {
                    item.moviesString = item.movies.join();
                }
            });
            return array;
        })
        .then(data => {
            let filterData = data.filter(element => {
                for (let key in element) {
                    if (element[key] && typeof element[key] === 'string') {
                        if (element[key].toLowerCase().includes(search.toLowerCase())) {
                            return element;
                        }
                    }
                }
            });
            return filterData;
        })
        .then(list => {

            if (list.length) {
                list.forEach(elem => content.insertAdjacentElement('beforeend', createCard(elem)));
            } else {
                searchText.textContent = 'По вашему запросу ничего не найдено';
            }
        });

};

const sortCards = filter => {
    searchText.textContent = '';
    if (filter) {
        getData(DB)
            .then(data => {
                search.value = '';
                movies.value = '';
                let arr = data.filter(item => item[filter]);

                if (filter !== 'birthDay' && filter !== 'deathDay' && filter !== 'movies') {

                    arr.sort((a, b) => {

                        if (b[filter].toLowerCase() > a[filter].toLowerCase()) {
                            return -1;
                        }
                        if (b[filter].toLowerCase() < a[filter].toLowerCase()) {
                            return 1;
                        }
                        return 0;

                    });

                    return arr;
                }

                if (filter === 'birthDay' || filter === 'deathDay') {

                    arr.sort((a, b) => new Date(a[filter]).getFullYear() - new Date(b[filter]).getFullYear());

                    return arr;

                }

                if (filter === 'movies') {
                    console.log('movies');

                    arr.sort((a, b) => b[filter].length - a[filter].length);
                    return arr;
                }
            })
            .then(arr => {
                content.textContent = '';
                arr.forEach(item => content.insertAdjacentElement('beforeend', createCard(item)));
            });
    }
};

const renderMovieList = () => {
    getData(DB)
        .then(data => {
            data.forEach(elem => content.insertAdjacentElement('beforeend', createCard(elem)));
            getMovieList(data);
        });
};

renderMovieList();

filter.addEventListener('change', event => sortCards(event.target.value));
search.addEventListener('input', event => renderSearchRequest(event.target.value));
movies.addEventListener('change', event => {
    filter.value = '';
    search.value = '';
    const index = event.target.options.selectedIndex;
    const filmName = movies[index].value;
    renderCards(filmName);
});