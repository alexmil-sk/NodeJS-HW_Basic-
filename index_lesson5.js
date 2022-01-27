const colors = require('colors');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const {
	dirname
} = require('path');
const cluster = require('cluster');
const os = require('os');


//const fullPath = path.join(__dirname, './index.html');
//const readStream = fs.createReadStream(fullPath);




//const server = http.createServer((req, res) => {
//res.write('Hello world write\n');
//console.log('req.url', req.url);
//console.log('req.method', req.method);
//console.log('req.headers', req.headers);
//console.log('req.cookie', req.cookie);
//res.setHeader('my-header', "test Header");
//res.setHeader('my-header2', "test Header2");

//res.writeHead(404, 'Page not found', {
//	'my-header-ERROR' : 'ERROR MESSAGE HEADER'
//});
//res.writeHead(200, 'Request was executed', {
//	'my-header3': 'Test Header 3'
//});
//res.end('The session is closed');

//МАРШРУТИЗАЦИЯ=================================

//if (req.url === '/user') {
//	res.end('User URL was connected');
//} else {
//	res.writeHead(404, 'User not found', {
//		"error-header": "Test Error Header",
//	});
//	res.end('No Users');
//}

//МЕТОДЫ==========================================

//if (req.method === 'GET') {
//	res.end('Method GET is allowed');
//} else {
//	res.writeHead(405, 'Method not Allowed', {
//		"error-header": "Test Error Header",
//	});
//	res.end('Method not Allowed');
//}


//const {query} = url.parse(req.url, true);
//console.log(query);
//res.end(JSON.stringify(query));

// if (req.method === 'POST') {
// 	let data = '';
// 	req.on('data', (chunk => data += chunk));
// 	req.on('end', () => {
// 		const parsedData = JSON.parse(data);
// 		console.log(data);
// 		console.log(parsedData);
// 		res.writeHead(200, 'OK', {
// 			'Content-type' : 'application/json'
// 		});

// 		res.end(data);
// 	});
// } else {
// 	res.end();
// }

//	res.writeHead(200, 'File was read', {
//		'Content-type': "text/html"
//	});
//	readStream.pipe(res);
//});

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running...`);
	for (let i = 0; i < os.cpus().length * 2; i++) { // * 2 - это увеличение количества потоков по 2 на каждое ядро
		console.log(`Forking process number ${i}`);
		cluster.fork();
	}
} else {
	console.log(`Worker ${process.pid} is running...`);
	const fullPath = path.join(__dirname, './index.html');
	const readStream = fs.createReadStream(fullPath);

	const server = http.createServer((req, res) => {
		setInterval(() => {
			console.log(`Worker ${process.pid} handling request`);

			res.writeHead(200, 'File was read', {
				'Content-type': "text/html"
			});
			readStream.pipe(res);
		}, 5000);
	});


	const PORT = process.env.PORT || 3000;

	server.listen(PORT, () => {
		console.log(colors.bgGreen.black(`Сервер подключен на порту ${PORT}`));
	});

}