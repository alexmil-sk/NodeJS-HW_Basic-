const colors = require('colors/safe');
const fs = require('fs');
const {
	Transform
} = require('stream'); //;__Загружаем модуль трансформ
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

//todo__ЧАСТЬ 3.1___ЧТЕНИЕ БОЛЬШИХ ФАЙЛОВ(СИСТЕМА 32 бит >= 700 Мб, система 64 бит >= 1, 4 Гб)______

//;__fs.ReadStream() ___ЭТО КЛАСС

//;__fs.createReadStream(); ___метод создания класса ReadStream

//const readStream = fs.createReadStream(ACCESS_LOG, {

//encoding: 'utf-8',
//__flags: '',
//__autoClose,
//__start - начало чтения на определенном байте 32 * n
//__end - конец чтения на определенном байте 32 * n
//highWaterMark: 64 //;__максимальный кусочек начтение, например: 64 байта
//__fs
//__fd
//});

//?__Работа с потоками построена не через коллбэки, а через событийно-ориентированную модель
//?__При каждом прочитывании определенного куска данных (здесь 64 байта) будет происходить определенное событие - это событие называется 'data'
//#__необходимо подписаться на событие data

//readStream.on('data', (chunk) => {
//	console.log('chunk:', chunk);
//});

//todo__ЧАСТЬ 3.2___ЗАПИСЬ БОЛЬШИХ ФАЙЛОВ______

//const writeStream = fs.createWriteStream(ACCESS_LOG, {
//	encoding: 'utf-8',
//	flags: 'a',
//	//highWaterMark: 64 //;__необходимо следить чтобы части данных при записи и чтении совпадали
//});

//request.forEach(item => {
//	writeStream.write(`item: ${item}\n`);
//});

//writeStream.end(() => { //;__Закрытие потока по завершению и вывод сообщения в консоль
//	console.log('END');
//});


//!_ЧАСТЬ 4_МОДУЛЬ TRANSFORM________________________________________________

//,__Модуль transform позволяет вклиниваться в процесс потоковой передачи данных и видоизменять (преобразовывать) данные, получаемые на выходе, например: установить фильтр или преобразовать данные
//?__Данный модуль не рекомендуется использовать для переадресации потоков через него потому, что это доплнительная нагрузка, когда можно написать обычную функцию для перенаправления потоков.
//?__Для передачи потоков есть метод pipe, например перенаправление стрима из чтения в запись
//?__readStream.pipe(writeStream);


//;__Условие: мы имеем файл access.log с перечнем IP. Если аккаунт проплачен, то не будем закрывать IP, а если не проплачен, то будем закрывать.

const payedAccount = false;
const readStream = fs.createReadStream(ACCESS_LOG);
const transformStream = new Transform({
	transform(chunk, encoding, callback) {
		if (!payedAccount) {
			const transformedData = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[IP был скрыт]'); //;_chunk должен быть строкой
			this.push(transformedData);//;__this - это контекст потока, с которым мы работаем
		} else {  
			this.push(chunk);
		}
		callback();
	}
}); //;__промежуточный поток, который будет принимать данные из readStream, что-то делать с этими данными, например переложить из пункта А в пункт Б, а не просто делать фоновую деятельность.

//;__Если необходимо выполнить какие-либо фоновые операции (визуализацию, вывести сообщения в консоль), то используем pipe: readStream.pipe(writeStream), а подписываясь на события, реагируем на какие-то ситуации.

readStream.pipe(transformStream).pipe(process.stdout); //;__process.stdout - поток вывода в консоль
