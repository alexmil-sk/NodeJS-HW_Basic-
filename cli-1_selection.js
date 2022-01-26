const colors = require('colors/safe');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

//*__CLI__COMMAND LINE INTERFACE__

//*=========< INQUIRER START >====================================================================

const questions = [
	{
		name: 'selection',
		type: 'file-tree-selection',
		message: 'Выберите файл: ',
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
		selection,
		findStr
	}) => {

		const fullPath = path.join(selection);
		const data = fs.readFileSync(fullPath, 'utf-8');
		console.log(colors.bgYellow.black(data));

		if (data.includes(findStr)) {
			console.log(colors.bgGreen.black('Строка включающая значение: ', findStr + ' найдена...'));
		} else {
			console.log(colors.bgRed('ОШИБКА! Строка включающая значение: ', findStr + ' НЕ найдена...'));
		}
	});

//*=========</ INQUIRER END >====================================================================