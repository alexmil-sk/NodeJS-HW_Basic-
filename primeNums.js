const colors = require('colors/safe');

const nums = process.argv.slice(2);
const [num1, num2] = [nums[0], nums[1]];

if (isNaN(num1)) {
	console.log(colors.bgYellow.red.bold("Ошибка ввода! Указанное значение начала диапазона - не число!", ));
} else if (isNaN(num2)) {
	console.log(colors.bgYellow.red.bold("Ошибка ввода! Указанное значение конца диапазона - не число!"));
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
console.log(colors.magenta.bold(primeArr));

