
for (var i = 2; i < 20; i++) {
	let isPrime = true;
	if (i > 2 && i % 2 != 0) {
		for (var j = 3; j * j <= i; j = j + 2) {
			if (i % j == 0) {
				isPrime = false;
				break;
			}
		}
	} else if (i != 2) {
		isPrime = false
	}
	if (isPrime == true) {
		console.log(i);
	}
}