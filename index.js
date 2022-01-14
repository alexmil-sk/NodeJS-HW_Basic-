const nums = process.argv.slice(2);
const [num1, num2] = [nums[0], nums[1]];


var n = num2;

for (var i = 2; i <= n; i++) {
	var flag = 1;
	if (i > 2 && i % 2 != 0) {
		for (var j = 3; j * j <= i; j = j + 2) {
			if (i % j == 0) {
				flag = 0;
				break;
			}
		}
	} else if (i != 2) flag = 0;
	if (flag == 1) {
		console.log(i);
	}
}