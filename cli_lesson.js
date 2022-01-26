//;#!C:\\Program Files\\nodejs\\node.exe - 
//!__ #!(shebang) - путь до файла, который будет исполнять данный файл
const colors = require('colors/safe');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const readline = require('readline');
const yargs = require('yargs'); //;__библиотека для работы с аргументами
const inquirer = require('inquirer');


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

//const rl = readline.createInterface({
//	input: process.stdin,
//	output: process.stdout,
//	terminal: false
//});

//;const regex = /^\.\/([a-z]{1,10})\.([a-z]{1,3})$/;_____//;./access.log


//!=========< CALLBACK HELL START>====================================================================

//rl.question(colors.bgMagenta.black('Введите путь до файла: '), (filePath) => {
//	console.log(colors.bgYellow.black(filePath));
//
//	if (filePath !== './access.log') {
//		console.log(colors.bgRed.white('Путь до файла введен некорректно!...', ));
//		rl.close();
//	} else {
//		rl.question(colors.bgMagenta.black('Введите кодировку файла: '), (fileCoding) => {
//			console.log(colors.bgYellow.black(fileCoding));
//			if (fileCoding !== 'utf-8') {
//				console.log(colors.bgRed.white('Кодировка файла указана некорректно!...', ));
//				rl.close();
//			} else {
//				fs.readFile(filePath, fileCoding, (err, data) => {
//					if (err) {
//						console.log(colors.bgRed.white('ERROR:', err.message));
//					} else {
//						console.log(colors.bgGreen.black(data));
//					}
//				});
//			}
//			rl.close();
//		});
//	}
//});

//!=========</ CALLBACK HELL END >====================================================================

//?=========< PROMISIFY START >=======================================================================

//const question = async (quest) => new Promise(resolve => rl.question(quest, resolve));

//(async () => {
//	const filePath = await question(colors.bgMagenta.black('Введите путь до файла: '));
//	const fileCoding = await question(colors.bgMagenta.black('Введите кодировку файла: '));

//const fullPath = path.join(__dirname, filePath);
//	const fullPath = path.resolve(__dirname, filePath); //;__исключает задвоенность адреса до файла 

// fs.readFile(filePath, fileCoding, (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(colors.bgGreen.black(data));
// 	}
// 	rl.close();
// });

//	const data = await fsPromises.readFile(filePath, fileCoding);

//	console.log(colors.bgYellow.black(fullPath));
//	console.log(colors.bgGreen.black(data));
//	rl.close();

//})();

//?=========</ PROMISIFY END >========================================================================

//*=========< INQUIRER START >====================================================================

// function isFile(fileName) {
// 	return fs.lstatSync(fileName).isFile();
// }

// const fileList = fs.readdirSync('./').filter(isFile);

// inquirer.prompt([ //,__prompt - это promise
// 	{
// 		name: 'fileName',
// 		type: 'list', //;  list, number, input, confirm, checkbox, passwords
// 		message: 'Выберите файл для чтения',
// 		choices: fileList
// 	},
// ]).then(({fileName}) => {
// 	console.log(colors.bgYellow.black(fileName));
// 	const fullPath = path.join(__dirname, fileName);
// 	console.log(colors.bgMagenta.black(fullPath));

// 	const data = fs.readFileSync(fullPath, 'utf-8');
// 	console.log(colors.bgGreen.black(data));

// });

//*=========</ INQUIRER END >====================================================================


//,=========< EXE START >===============================================================

const executionDir = process.cwd();

function isFile(fileName) {
	return fs.lstatSync(fileName).isFile();
}

const fileList = fs.readdirSync('./').filter(isFile);

inquirer.prompt([ //,__prompt - это promise
	{
		name: 'fileName',
		type: 'list', //;  list, number, input, confirm, checkbox, passwords
		message: 'Выберите файл для чтения',
		choices: fileList
	},
]).then(({
	fileName
}) => {
	console.log(colors.bgYellow.black(fileName));
	const fullPath = path.join(executionDir, fileName);
	console.log(colors.bgMagenta.black(fullPath));

	const data = fs.readFileSync(fullPath, 'utf-8');
	console.log(colors.bgGreen.black(data));

});


console.log(colors.bgYellow.black(process.argv));


//,=========</ EXE END >===============================================================
