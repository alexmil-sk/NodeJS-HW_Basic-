const colors = require('colors/safe');
const fs = require('fs');
const readline = require('readline');
const yargs = require('yargs'); //;__библиотека для работы с аргументами

//*__CLI__COMMAND LINE INTERFACE__

//;=========================================================

//console.log(process.argv);
//const [filePath] = process.argv.slice(2);

//const options = yargs
//	.usage('Usage: -p <path to the file>')
//	.option('p', {
//		alias: 'path',
//		describe: 'Path to the file',
//		type: 'string',
//		demandOption: true
//	}).argv;
//
//console.log(colors.bgYellow.black('yargs:', options));

//fs.readFile(options.p, 'utf-8', (err, data) => {
//	if (err) {
//		console.log(colors.bgRed.white('ERROR:', err));
//	} else {
//		console.log(colors.bgGreen.black(data));
//	}
//});

//;==========================================================

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.question(colors.bgMagenta.black('Введите путь до файла: '), (filePath) => {
	console.log(colors.bgYellow.black(filePath));
	fs.readFile(filePath, 'utf-8', (err, data) => {
		if (err) {
			console.log(colors.bgRed.white('ERROR:', err));
		} else {
			console.log(colors.bgGreen.black(data));
		}
	});
	rl.close();
});