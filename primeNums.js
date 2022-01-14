const colors = require('colors/safe');

const nums = process.argv.slice(2);
const [num1, num2 ] = [nums[0], nums[1]];

let i = +num1;
const primeArr = [];

for (; i <= num2; i++) {
	let flag = 1;
	if (i > 2 && i % 2 != 0) {
		for (let j = 3; j * j <= i; j = j + 2) {
			if (i % j == 0) {
				flag = 0;
				break;
			}
		}
	} else if (i != 2) {
		flag = 0
	};
	if (flag == 1) {
		primeArr.push(i);
		//console.log(i);
	}
}
console.log(colors.magenta.bold(primeArr));
