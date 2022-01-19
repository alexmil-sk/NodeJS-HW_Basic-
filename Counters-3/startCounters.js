const colors = require('colors/safe');
//const startjs = require('./start.js');

//#_0_Подключаем модуль событий

const EventEmitter = require('events');

//#_1_Создаем экземпляр эмиттера

const emitter = new EventEmitter();

//#_2_Объявляем варианты таймеров

const counters = [{
		type: 'counter1',
		//payload: 'Date 1'
		//payload: new Date(2022, 0, 19, 13, 0, 0).getTime()
		//payload: require('./counter-1.js')
	},
	{
		type: 'counter2',
		//payload: 'Date 2'

		//payload: require('./counter-2.js')
		//payload: new Date(2022, 0, 19, 14, 0, 0).getTime()
	},
	{
		type: 'counter3',
		//payload: 'Date 3'
		//payload: require('./counter-3.js')
		//payload: new Date(2022, 0, 19, 15, 0, 0).getTime()
	},
];

//#_3_Описываем класс таймера

class Counter {
	constructor({
		type,
		//payload
	}) {
		this.type = type;
		//this.payload = payload;
	}
}

//#_4_Переключаемся между счетчиками

const createCounterNum = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);

}

//#_4_Определяем номер счетчика

const getNewCounter = () => {
	const newCounterIndex = createCounterNum(0, counters.length - 1);
	const counterParams = counters[newCounterIndex];
	

	return new Counter(counterParams);

}

console.log('getNewCounter:', getNewCounter());

//#_5_Создание событий счетчика

const startCount = async () => {
	const {
		type
	} = getNewCounter();
	emitter.emit(type);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await startCount();
}


//#_4_Создаем обработчики событий

class StartCounter {
	static counter1() {
		require('./counter-1.js');
		console.log(colors.yellow("=================================================="));
	}
	static counter2() {
		require('./counter-2.js')
		console.log(colors.yellow("=================================================="));
	}
	static counter3() {
		require('./counter-3.js')
		console.log(colors.yellow("=================================================="));
	}
}

//#_5_Запуск таймеров

emitter.on('counter1', StartCounter.counter1);
emitter.on('counter2', StartCounter.counter2);
emitter.on('counter3', StartCounter.counter3);

startCount();