const worker_threads = require('worker_threads');
const colors = require('colors');

//;__Worker генерации пароля

const generatePassword = (passSize) => {
	return new Promise((resolve, reject) => {
		const worker = new worker_threads.Worker('./worker.js', {
			workerData: passSize,
		});
		worker.on('message', resolve);
		worker.on('error', reject);
	});
};

(async () => {
	const passBytesSize = 14;
	const password = await generatePassword(passBytesSize);

	console.log(colors.bgGreen.black(password));
})();