const colors = require('colors/safe');
const fs = require('fs');
const { Transform } = require('stream');

//;=========================================================================

//#__Напишите программу, которая находит в этом файле все записи с ip - адресами:
//#__- 89.123.1.41
//#__и
//#__- 34.48.240.111,
//#__а также сохраняет их в отдельные файлы с названием < %ip-адрес%_requests.log >.

//;=========================================================================


const MY_ACCESS_LOG = './myaccess.log';
const IP_ADDRESS_89 = './%89.123.1.41%_requests.log';
const req_89 = /^([8-9]{1,2}[\.])([1-3]{1,3}[\.])([1]{1,1}[\.])[1,4]{1,2}\b/;
const req_89_n = /^([8-9]{1,2}[\.])([1-3]{1,3}[\.])([1]{1,1}[\.])[1,4]{1,2}\b/;
const IP_ADDRESS_34 = './%34.48.240.111%_requests.log';

const readStream = fs.createReadStream(MY_ACCESS_LOG);
const writeStream = fs.createWriteStream(IP_ADDRESS_89);

//const sortedStream = new Transform({
//	transform(chunk, encoding, callback) {
//		callback(null, chunk.toString());
//	}
//});



const sortedStream = new Transform({
	transform(chunk, encoding, callback) {
		if (true) {
			const transformedData = chunk.toString();
			this.push(transformedData);
		} else {
			console.log(colors.bgYellow.black('ERROR:'))
		}
			

		callback();
	}
});


//const writeStream = fs.createWriteStream(IP_ADDRESS_89, {
//	encoding: 'utf-8',
//	flag: 'a',
//	highWaterMark: 128
//}, (err) => {
//	if (err) console.log(colors.bgYellow.black('ERROR:', err))
//});

readStream.pipe(sortedStream).pipe(writeStream);

