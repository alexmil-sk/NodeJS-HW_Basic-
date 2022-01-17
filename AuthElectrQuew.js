const colors = require('colors/safe');

//?_API автомата выдачи билетов электронной очереди_

//*_ИСХОДНЫЕ ДАННЫЕ_========================================
//;_1_Необходим список вариантов услуг для посетителей
//;_2_Должен быть посетитель (определяем его через класс ES6)
//;_3_Должна быть функция генерация определенного значения,
//;_при этом можно будет задавать диапазон из которого происходит генерация порядкового номера очереди
//;_4_Функция, которая будет создавать рандомного посетителя с запросом своей услуги
//;_5_Создание функции, которая запустит процесс и будет генерировать посетителей
//;_6_Написать обработчики событий для различных видов посетителей
//;_Генерация событий

//#_0_Подключаем модуль событий

const EventEmitter = require('events');

//#_0.1_Создаем экземпляр эмиттера

const emitter = new EventEmitter();

//#_1_Объявляем возможные типы запросов услуг посетителей
const requestTypes = [{
		type: 'send',
		payload: 'to send a document'
	},
	{
		type: 'receive',
		payload: 'to receive a document'
	},
	{
		type: 'sign',
		payload: 'to sign a document'
	}
];

//#_2_Описываем класс посетителя, который будем автоматически генерировать в зависимости от рандомно выбранного типа запрошенной услуги 

class Customer {
	constructor({
		type,
		payload
	}) {
		this.type = type;
		this.payload = payload;
	}
}

//#_3_Пишем генерацию числа из определенного диапазона

const generateIntInRange = (min, max) => {
	//, min(inclusive) and max(exclusive)
	//return Math.floor(Math.random() * (max - min) + min);
	//, min(inclusive) and max(inclusive)
	return Math.floor(Math.random() * (max - min + 1) + min); //,_+1 означает что при использовании Math.floor будет также использовано само максимальное значение диапазона
	//, т.е., например: min=1, max=10, тогда без +1 макс. значение диапазона будет 9.99Е и при округлении floor получится вариант выбора числа от 1 до 9, а при наличии +1 макс. значение диапазона будет 10.99Е и вариант выбора числа будет от 1 до 10, что сообтветствует макс. значению, которое ввел пользователь.
}

//#_4_Пишем функцию генерации случайного посетителя

const generateNewCustomer = () => {
	const randomTypeIndex = generateIntInRange(0, requestTypes.length - 1); //,_генерируем индекс элемента массива для requestTypes
	const typeParams = requestTypes[randomTypeIndex]; //,_Указываем конкретный элемент массива requestTypes по сгенерированному индексу

	return new Customer(typeParams);

}

//#_5_Пишем функцию где мы будем создавать рандомных пользователей и создавать очередь с некоторой задержкой

const run = async () => {
	const {
		type,
		payload
	} = generateNewCustomer();
	//console.log(colors.bgGreen.black.italic("customer: "), colors.bgBlue.white(customer));
	emitter.emit(type, payload); //;_активируем событие send с помощью метода emit()
	//;_передаем два параметра в каждый из методов класса Handler
	await new Promise((resolve) => setTimeout(resolve, generateIntInRange(1000, 5000)));
	await run();
}

//#_6_Создаем обработчики событий

class Handler {
	static send(payload) {
		console.log(colors.bgGreen.black.italic('Send request', payload));
	}
	static receive(payload) {
		console.log(colors.bgGreen.black.italic('Receive request', payload));
	}
	static sign(payload) {
		console.log(colors.bgGreen.black.italic('Sign request', payload));
	}
}

//#_Когда пришел новый посетитель, нужно сообщить, что новый посетитель пришел и нужно делигировать соответствующую задачу
//#_и здесь мы подходим к пониманию, что такое EventEmitter

emitter.on('send', Handler.send); //;_подписываемся на событие send с помощью метода on()
emitter.on('receive', Handler.receive); //;_подписываемся на событие receive с помощью метода on()
//emitter.on('sign', Handler.sign); //;_подписываемся на событие sign с помощью метода on()
emitter.on('sign', () => {
	emitter.emit('error', colors.bgRed('The pen "sign" was broken...'));
}); //;_вариант sign со сломанной ручкой для появления ошибки

emitter.on('error', console.log);

run();

//!_emitter.setMaxListenerы() - установка макс. количества эмиттеров(по умолчанию не более 10).