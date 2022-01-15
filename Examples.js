const colors = require('colors/safe');

let countStart = 0;
console.log(colors.bgBlue.black('Начальное значение счетчика', countStart));

//,_Пример 1_==========================================
//let timer = setInterval(function () {
//	countStart++;
//	if (countStart == 5) {
//		clearInterval(timer);
//		setTimeout(function () {
//			console.log(colors.bgRed.white('Текущее значение счетчика', countStart));
//		}, 1000);
//	}
//	console.log(colors.bgYellow.black('CountDown:', countStart));
//}, 1000);

//,_Пример 2_==========================================


//let recursive = function () {
//	countStart++;
//	if (countStart == 5) {
//		console.log(colors.bgRed.white('Текущее значение счетчика', countStart));
//		return;
//	}
//	console.log(colors.bgYellow.black('CountDown:', countStart));
//	setTimeout(recursive, 1000);
//}
//
//recursive();


