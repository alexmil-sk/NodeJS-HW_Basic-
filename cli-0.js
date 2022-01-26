const colors = require('colors/safe');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

//*__CLI__COMMAND LINE INTERFACE__

//*=========< INQUIRER START >====================================================================

//?_сортировка для отображения только файлов===START======
//function isFile(fileName) {
//	return fs.lstatSync(fileName).isFile();
//}

//const fileList = fs.readdirSync('./').filter(isFile);
//?_сортировка для отображения только файлов====END======


const executionDir = process.cwd();



const questions = [{
		name: 'dirNameUser',
		type: 'input', //;  list, number, input, confirm, checkbox, passwords
		message: 'Введите директорию запуска файла: ',
		default: executionDir,
	},
	{
		name: 'fileName',
		type: 'input', //;  list, number, input, confirm, checkbox, passwords
		message: 'Выберите файл для чтения: ',
	},
	{
		name: 'findStr',
		type: 'input', //;  list, number, input, confirm, checkbox, passwords
		message: 'Введите строку для поиска: ',
		validate: (answer) => {
			if (answer === '') {
				return "Введите строку для поиска"
			}
			return true;
		}
	}
];

inquirer
	.prompt(questions)
	.then(({
		dirNameUser,
		fileName,
		findStr
	}) => {

		const fullPath = path.join(dirNameUser ? dirNameUser : executionDir, fileName);
		const data = fs.readFileSync(fullPath, 'utf-8');

		if (data.includes(findStr)) {
			console.log(colors.bgBlue.black(data));
			console.log(colors.bgYellow.black('Строка включающая значение: ', findStr + ' найдена...'));
		} else {
			console.log(colors.bgRed('ОШИБКА! Строка включающая значение: ', findStr + ' НЕ найдена...'));
		}
	});

//*=========</ INQUIRER END >====================================================================