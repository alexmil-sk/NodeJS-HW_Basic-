const colors = require('colors/safe');
const fs = require('fs');
const readline = require('readline');
const {Transform} = require('stream');

//;=========================================================================

//#__Напишите программу, которая находит в этом файле все записи с ip - адресами:
//#__- 89.123.1.41
//#__и
//#__- 34.48.240.111,
//#__а также сохраняет их в отдельные файлы с названием < %ip-адрес%_requests.log >.

//;=========================================================================

const ip_89 = process.argv[2]; //;_89.123.1.41
const ip_34 = process.argv[3]; //;_34.48.240.111

console.log(colors.bgYellow.black('IP1:', ip_89 + '\nIP2:',	ip_34));

const MY_ACCESS_LOG = './myaccess.log';
//const BIG_ACCESS_LOG = './access_BIG.log';

const IP_ADDRESS_89 = './%89.123.1.41%_requests.log';
const IP_ADDRESS_34 = './%34.48.240.111%_requests.log';

const readStream_SMALL = fs.createReadStream(MY_ACCESS_LOG);
//const readStream_BIG = fs.createReadStream(BIG_ACCESS_LOG);
const writeStreamIp_89 = fs.createWriteStream(IP_ADDRESS_89);
const writeStreamIp_34 = fs.createWriteStream(IP_ADDRESS_34);


let rl = readline.createInterface({
	input: readStream_SMALL,
	output: [writeStreamIp_89, writeStreamIp_34],
	terminal: false
});
rl.on('line', (line) => {
	if (line.includes(ip_89)) {
		//console.log(colors.bgYellow.black(line));
		writeStreamIp_89.write(line.toString()+'\n');
	} else if (line.includes(ip_34)) {
		//console.log(colors.bgMagenta.black(line));
		writeStreamIp_34.write(line.toString() + '\n');
	}
});