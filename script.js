'use strict';

const convert = () => {
    const API_KEY = 'adf8379c9416f9bf04da4e95980c5f09';
    const convertForm = document.querySelector('.convert-form');
    const inputValue = document.getElementById('input');

    const showResult = resp => {
        const resultValue = document.getElementById('result');
        const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=RUB,USD,EUR`;

        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const { rates } = data;
                resultValue.value = ((+resp['input-value'] / (rates[resp['input-currency']])) * rates[resp['output-currency']]).toFixed(2);
            })
            .catch(error => console.error(error));
    };

    inputValue.addEventListener('input', event => event.target.value = event.target.value.replace(/\D/gi, '').replace(/^0/gi, ''));

    convertForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(convertForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        showResult(data);
    });

};

convert();