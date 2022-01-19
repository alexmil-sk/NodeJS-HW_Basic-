const colors = require('colors/safe');


const dest = new Date('jan 20, 2022 15:45:29').getTime();



const interval = setInterval(() => {


	let now = new Date().getTime();
	let diff = dest - now;

	let days = parseInt(diff / (1000 * 60 * 60 * 24));
	let hrs = parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let min = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60));
	let sec = parseInt((diff % (1000 * 60)) / 1000);

	if (days <= 0 && hrs <= 0 && min <= 0 && sec <= 0) {
		console.log(colors.bgBlue.black('Counter 2'), colors.bgRed.black('Обратный отсчет завершен.'));
		console.log(colors.bgBlue.black('Counter 2'), colors.bgYellow.black('Введите новое значение счетчика.'));
		clearInterval(interval);
		return;
	}

	console.log(colors.bgBlue.black('Counter 2'), colors.bgBlue.black('days: ', days + ' / hrs: ', hrs + ' / min: ', min + ' / sec: ', sec));

}, 1000);