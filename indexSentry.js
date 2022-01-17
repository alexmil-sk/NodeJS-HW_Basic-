const colors = require('colors/safe');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
	dsn: "https://3df35d67a5454fd488191dc8c3c8b7ef@o1118520.ingest.sentry.io/6152549",
	tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
	op: "test",
	name: "My First Test Transaction",
});

setTimeout(() => {
	try {
		sentryFunc();
	} catch (e) {
		Sentry.captureException(e);
	} finally {
		transaction.finish();
	}
}, 99);

//;=========================================================================

//;_Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате« час - день - месяц - год».
//;_Задача программы— создавать для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров(сколько осталось).
//;_По истечении какого - либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы.
//;_Важно, чтобы работа программы основывалась на событиях.


function sentryFunc() {
	console.log('SENTRY APP');

}
