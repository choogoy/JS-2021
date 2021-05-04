document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();          
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.readyState === 4 && request.status === 200) {
                    const response = JSON.parse(request.responseText);
                    resolve(response);
                } else {
                    reject(request.status);
                }
            });
        });
    };
    
    const showCar = data => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };

    select.addEventListener('change', () => {
        getData()
            .then(showCar)
            .catch(error => {
                output.innerHTML = 'Произошла ошибка';
                console.error(error);
            });
    });

});