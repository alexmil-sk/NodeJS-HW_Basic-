const colors = require('colors/safe');

const nums = process.argv.slice(2);
const [num1, num2] = [nums[0], nums[1]];

function isNotNumber(arg1, arg2) {

	if (isNaN(arg1)) {
		console.log(colors.bgYellow.red.bold("Ошибка ввода! Указанное значение начала диапазона - не число!"));
		return false;
	} else if (isNaN(arg2)) {
		console.log(colors.bgYellow.red.bold("Ошибка ввода! Указанное значение конца диапазона - не число!"));
		return false;
	}
	return true;
}

function primeNums(arg1, arg2) {

	if (isNotNumber(arg1, arg2) == false) {
		return;
	}

	let i = +num1;
	let endNum = +num2;
	const primeArr = [];

	for (; i <= endNum; i++) {
		let isPrime = true;
		if (i > 2 && i % 2 != 0) {
			for (let j = 3; j * j <= i; j = j + 2) {
				if (i % j == 0) {
					isPrime = false;
					break;
				}
			}
		} else if (i != 2) {
			isPrime = false
		};
		if (isPrime == true) {
			primeArr.push(i);
		}
	}
	return primeArr;
}

function colorsNum() {
	const arr = primeNums(num1, num2);
	if (arr.length == 0) {
		console.log(colors.bgRed.bold("Простые числа в указанном диапазоне отсутствуют..."));
	}
	console.log(arr);
}

colorsNum();
