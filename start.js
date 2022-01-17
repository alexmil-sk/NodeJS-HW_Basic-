const colors = require('colors/safe');


Promise.resolve(process.argv)
	.then(() => {
		console.log(colors.bgGreen.black('Введите дату и время'));
	})
	.then(() => {
		console.log('process.argv', process.argv)
		const args = process.argv;
		const [arg1, arg2, arg3, arg4, arg5, arg6] = [args[2], args[3], args[4], args[5], args[6], args[7]];
		if (arg6) {
			console.log(colors.bgMagenta.black(`Ваши аргументы: Год ${arg1}, Месяц ${arg2}, День ${arg3}, Час ${arg4}, Минут ${arg5}, Секунд ${arg6}`));
			console.log(colors.bgBlue.black('Обратный отсчет начался...'));
			require('./index.js');
		} else {
			console.log(colors.bgRed('Данные введены не полностью!...'));
			console.log(colors.bgGreen.black('Введите дату и время'));
			return;
		}
	});