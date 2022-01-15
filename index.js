const colors = require('colors/safe');

const dest = new Date('jan 15, 2022 14:49:00').getTime();

console.log(colors.bgBlue.black('Обратный отсчет начался...'));


const interval = setInterval(() => {


	let now = new Date().getTime();
	let diff = dest - now;

	let days = parseInt(diff / (1000 * 60 * 60 * 24));
	let hrs = parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let min = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60));
	let sec = parseInt((diff % (1000 * 60)) / 1000);

	if (days == 0 && hrs == 0 && min == 0 && sec == 0) {
		console.log(colors.bgRed.black('Обратный отсчет завершен.'));
		clearInterval(interval);
		return;
	}

	console.log(colors.bgYellow.black('days: ', days + ' / hrs: ', hrs + ' / min: ', min + ' / sec: ', sec));

}, 1000);


//if (diff === 0) {
//	console.log(colors.bgRed.black('Обратный отсчет завершен.'));
//	clearInterval(interval);
//	return;
//}