const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
	dsn: "https://3df35d67a5454fd488191dc8c3c8b7ef@o1118520.ingest.sentry.io/6152549",

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
	op: "test",
	name: "My First Test Transaction",
});

setTimeout(() => {
	try {
		foo()
	} catch (e) {
		Sentry.captureException(e);
	} finally {
		transaction.finish();
	}
}, 99);


function foo() {

	console.log('СТРОКА');
}