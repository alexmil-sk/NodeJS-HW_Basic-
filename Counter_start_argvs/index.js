const colors = require('colors/safe');
const EventEmitter = require('events');

//console.log(colors.bgGreen.black('Введите дату и время'));

const args = process.argv;
const [arg1, arg2, arg3, arg4, arg5, arg6] = [args[2], args[3], args[4], args[5], args[6], args[7]];

//console.log(colors.bgMagenta.black(`Ваши аргументы: Год ${arg1}, Месяц ${arg2}, День ${arg3}, Час ${arg4}, Минут ${arg5}, Секунд ${arg6}`));

const dest = new Date(arg1, arg2, arg3, arg4, arg5, arg6).getTime();

//console.log(colors.bgBlue.black('Обратный отсчет начался...'));





//; const dest = new Date('jan 17, 2022 11:02:00').getTime();
//; const dest = new Date(2022, 0, 17, 11, 21, 0).getTime();
//const dest = new Date(arg1, arg2, arg3, arg4, arg5, arg6).getTime();

//console.log(colors.bgBlue.black('Обратный отсчет начался...'));


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