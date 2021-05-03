/* 	функция filterByType принимает тип данных и перечень данных с помощью спред оператора (делаем массив из строки),
	затем фильтрует входные данные в зависимости от переданного типа.
	возвращает массив только с теми данными тип которых совпадает с заданным
*/
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// вспомогательная функция hideAllResponseBlocks скрывает все блоки с результатами
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	/* 	функция showResponseBlock показывает необходимый блок с текстом
		аргументами передается селектор блок, селектор спана и текст для спана
	*/
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// функция выводит сообщение об ошибке в блок с ошибкой с результатом
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// функция выводит сообщение об успешном выполнении программы с результатом
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// функция выводит сообщение по умолчанию в блок с результатом
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),


	/* 	блок Try-Catch отлавливает возможные ошибки при выполнении кода
		и в случае ошибки вызывает функцию showError
		передаем значение типа данных и массив данных из инпута
		используем дико редкую функцию eval для получения строки из массива данных с разделителем ", "
	*/
	tryFilterByType = (type, values) => {
		try {
			console.log(type);
			console.log(...values);

			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			console.log(valuesArray);
			// с помощью тернарного оператора формируем сообщение alertMsg проверяем длину строки
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg); // выводим сообщение с результатом
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};


// получаем со страницы кнопку начала фильтрации
const filterButton = document.querySelector('#filter-btn');

// вешаем слушатель на кнопку по клику
filterButton.addEventListener('click', e => {
	// получаем инпуты со страницы (тип данных из селекта и сами данные)
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	/* выполняем проверку на пустое поле с вводом списка данных
		если список пустой, то выводим блок с сообщением по умолчанию
		а также всплывающее сообщение 'Поле не должно быть пустым!' под инпутом с помощью метода setCustomValidity
	*/
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();

	/* иначе очищаем всплыващее сообщение под инпутом
		отменяем стандартное поведение браузера
		запускаем основную функцию tryFilterByType
		передаем в нее значение из селекта и инпута (предварительно удаляем возможные пробелы в начале и в конце значений)
	*/
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

