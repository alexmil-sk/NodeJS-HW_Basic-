const colors = require('colors/safe');
const EventEmitter = require('events');


class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

Promise.resolve(process.argv)
	.then(() => {
		console.log('process.argv', process.argv)
		const args = process.argv;
		const [arg1, arg2, arg3, arg4, arg5, arg6] = [args[2], args[3], args[4], args[5], args[6], args[7]];
		if (arg6) {
			console.log(colors.bgGreen.black('Данные введены корректно...'));
			console.log(colors.bgMagenta.black(`Ваши аргументы: Год ${arg1}, Месяц ${arg2}, День ${arg3}, Час ${arg4}, Минут ${arg5}, Секунд ${arg6}`));
			console.log(colors.bgBlue.black('Обратный отсчет начался...'));
			require('./counter.js');
		} else {
			console.log(colors.bgRed('Данные введены не полностью!...'));
			console.log(colors.bgGreen.black('Введите дату и время'));
			return;
		}
	});