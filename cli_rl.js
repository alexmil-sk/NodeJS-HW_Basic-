const colors = require('colors/safe');
const fs = require('fs');
const readline = require('readline');

//;=========================================================================

const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

//;=========< INQUIRER >====================================================

const questions = [{
		name: 'selection',
		type: 'file-tree-selection',
		message: 'Выберите каталог и файл для чтения: ',
	},
	{
		name: 'findStr',
		type: 'input', //;  list, number, input, confirm, checkbox, passwords
		message: 'Введите строку для поиска: ',
		validate: (answer) => {
			if (!answer) {
				console.log("Пустая строка выводит файл полностью");
				return true;
			} else {
				return true;
			}
		},
	},
	{
		name: 'writeStr',
		type: 'input', //;  list, number, input, confirm, checkbox, passwords
		message: 'Введите название файла для сохранения результата поиска: ',
		default: 'result.log',
		validate: (answer) => {
			if (answer === '') {
				return "Введите название файла"
			}
			return true;
		}
	}
];

//;=========================================================================

inquirer
	.prompt(questions)
	.then(({
		selection,
		findStr,
		writeStr
	}) => {

		const fullPath = selection;
		const data = fs.readFileSync(fullPath, 'utf-8');

		const ACCESS_LOG = fullPath;
		const RESULT_LOG = writeStr;

		const readStream = fs.createReadStream(ACCESS_LOG);
		const writeStream = fs.createWriteStream(RESULT_LOG);

		if (!findStr) {
			console.log(colors.bgRed('Строка поиска пуста! Файл выведен полностью...'));
			console.log(colors.bgYellow.black('Результат находитсяв файле: ' + colors.bgMagenta.black(writeStr)));
		} else if (data.includes(findStr)) {
			console.log(colors.bgYellow.black('Строка для поиска:', colors.bgMagenta.black(findStr)));
			console.log(colors.bgGreen.black('Строка включающая значение: ', findStr + ' найдена...'));
			console.log(colors.bgYellow.black('Результат поиска находитсяв файле: ' + colors.bgMagenta.black(writeStr)));
		} else {
			console.log(colors.bgRed('Строка включающая значение: ' + colors.bgYellow.black(findStr) + ' НЕ найдена в файле по адресу: ' + colors.bgYellow.black(ACCESS_LOG)));
		}

		//;=========< READLINE >================================================================

		let rl = readline.createInterface({
			input: readStream,
			output: writeStream,
			terminal: false
		});

		rl.on('line', (line) => {
			if (line.includes(findStr)) {
				writeStream.write(line.toString() + '\n');
			}
			rl.close();
		});
	});