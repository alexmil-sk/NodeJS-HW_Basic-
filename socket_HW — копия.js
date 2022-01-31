const socket = require('socket.io');
const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const {
	nanoid
} = require('nanoid');


//;===============================================
//const user = function createUser(user) {
//	const id = nanoid(3);
//	const chatUser = `${user}_${id}`;
//	console.log(chatUser);
//}



//;==============<SOCKET ON THE SERVER SIDE>==========================

const myServer = http.createServer((req, res) => {
	const indexPath = path.join(__dirname, 'index.html');
	const readStream = fs.createReadStream(indexPath);
	readStream.pipe(res);
});

const io = socket(myServer);

io.on('connection', (client) => {
	//console.log(colors.bgYellow.black('Client from Server Side was connected'), colors.bgWhite.black(client)); //;_информация о клиенте

	client.on('clientMsg', (sendData) => { //;_Подписываемся только на события, связанные с клиентом, название события должно соответствовать, как мы назвали событие, которое эмитим (emit) на сервере
		console.log(colors.bgMagenta.black('Данные о клиенте: ', sendData));

		const serverUserData = {
			nickname: sendData.nickname.split('').join(''),
			message: sendData.message.split('').join(''),
		};

		//client.broadcast.emit('serverMsg', serverUserData); //;_Отправляет сообщения всем кроме нас
		//client.emit('serverMsg', serverUserData); //;_Отправляет сообщения только себе

		io.emit('serverMsg', serverUserData); //;__Используется только для отправки глобального сообщения всем пользователям

	});
});




const PORT = process.env.PORT || 3000;

myServer.listen(PORT, () => {
	console.log(colors.bgGreen.black(`Server is started on port: ${PORT}`));
});