const colors = require('colors/safe');
const fs = require('fs');
//const fsPromises = require('fs/promises');
const ACCESS_LOG = './access.log';

//!_ЧАСТЬ 1_ЧТЕНИЕ НЕБОЛЬШОГО ОБЪЕМА ДАННЫХ ИЗ ФАЙЛА_______________________________________________________

//?__СИНХРОННОЕ ЧТЕНИЕ ФАЙЛА_________

//,_чтение__
//_1_ const data = fs.readFileSync(ACCESS_LOG, 'utf-8');
//_2_ const data = fs.readFileSync(ACCESS_LOG, {encoding: 'utf-8'});
//_3_ const data = fs.readFileSync(ACCESS_LOG);

//,_вывод__

//_1_ console.log('data:', data.toString());
//_2_ console.log('data:', data.toJSON());

//?__AСИНХРОННОЕ ЧТЕНИЕ ФАЙЛА_________

//,_чтение и вывод__

//_1_ fs.readFile(ACCESS_LOG, 'utf-8', (err, data) => {

//_2_ fs.readFile(ACCESS_LOG, {encoding: 'utf-8'}, (err, data) => {
//	if (err) console.log(colors.bgRed('ERR:', err.message))
//	console.log(colors.bgBlue.black('DATA:', data));
//});

//?__ЧТЕНИЕ ФАЙЛА ЧЕРЕЗ ПРОМИС_________

//_1_ fsPromises.readFile(ACCESS_LOG, 'utf-8')
//_2_ fsPromises.readFile(ACCESS_LOG, {encoding: 'utf-8'})
//	.then(data => console.log('DATA:', data))
//	.catch(err => console.log('ERROR:', err.message))

//!_ЧАСТЬ 2_ЗАПИСЬ НЕБОЛЬШОГО ОБЪЕМА ДАННЫХ В ФАЙЛ_______________________________________________________

const request = [
	`127.0.0.1 - - [30/Jan/2021:11:10:15 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
	`127.0.0.1 - - [30/Jan/2021:11:10:15 -0300] "POST /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
];

//,_перезапись данных в файле__

//fs.writeFile(ACCESS_LOG, request[1] + '\n', { encoding: 'utf-8' }, (err) => console.log('ERROR:', err));

//,_добавление данных в файл с помощью writeFile и флаг 'a'__

//fs.writeFile(ACCESS_LOG, request[0] + '\n', { encoding: 'utf-8', flag: 'a' }, (err) => {
//	//if (err) console.log('ERROR:', err)
//	if (err) throw err;
//});

//,_добавление данных в файл с помощью appendFile без флага 'a'__

//fs.appendFile(ACCESS_LOG, request[0] + '\n', { encoding: 'utf-8'}, (err) => {
//	if (err) throw err;
//});


//!_ЧАСТЬ 3_ПОТОКОВАЯ ПЕРЕДАЧА ДАННЫХ________________________________________________
//!__ЧТЕНИЕ БОЛЬШИХ ФАЙЛОВ(СИСТЕМА 32 бит >= 700 Мб, система 64 бит >= 1, 4 Гб)______

//fs.ReadStream() //#__ ЭТО КЛАСС


