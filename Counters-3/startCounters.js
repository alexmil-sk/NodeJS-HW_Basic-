const colors = require('colors/safe');

//;=========================================================================

//;_Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате:
//, « час - день - месяц - год».
//;_Задача программы— создавать для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров(сколько осталось).
//;_По истечении какого - либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы.
//;_Важно, чтобы работа программы основывалась на событиях.

//;=========================================================================



//#_0_Подключаем модуль событий

const EventEmitter = require('events');

//#_1_Создаем экземпляр эмиттера

const emitter = new EventEmitter();

//#_2_Объявляем варианты таймеров

const counters = [{
		type: 'counter1',
	},
	{
		type: 'counter2',
	},
	{
		type: 'counter3',

	},
];

//#_3_Описываем класс таймера

class Counter {
	constructor({
		type,
	}) {
		this.type = type;
	}
}

//#_4_Генерация номера счетчика

function generateNumber() {
	if (!generateNumber.counter) {
		generateNumber.counter = 0;
	} else if (generateNumber.counter === counters.length) {
		generateNumber.counter = 0;
	}
	return generateNumber.counter++;
}


//#_5_Определяем номер счетчика

const getNewCounter = () => {
	const newCounterIndex = generateNumber();
	const counterParams = counters[newCounterIndex];


	return new Counter(counterParams);

}

//#_6_Создание событий счетчика

const startCount = async () => {
	const {
		type
	} = getNewCounter();
	emitter.emit(type);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await startCount();
}


//#_7_Создаем обработчики событий

class StartCounter {
	static counter1() {
		require('./counter-1.js');
	}
	static counter2() {
		require('./counter-2.js')
	}
	static counter3() {
		require('./counter-3.js')
	}
}

//#_8_Запуск таймеров

emitter.on('counter1', StartCounter.counter1);
emitter.on('counter2', StartCounter.counter2);
emitter.on('counter3', StartCounter.counter3);

startCount();