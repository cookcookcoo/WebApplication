//initialise Express JS and Socket.IO
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 将 public 目录作为静态文件目录
app.use(express.static('public'));

//send index.html when a user connects to the server
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about/index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat/index.html');
});

let users = [];
let user1 = '1';

io.on('connection', (socket) => {
    // 消息发送处理
    socket.on('send-clicked', (data) => {
        io.emit('send-clicked', data);
    });

    // 用户加入处理
    socket.on('join', (username) => {
        user1 = username;
        console.log('User joined:', user1);
        users.push(username);
        socket.broadcast.emit('user-joined', username); // 发送用户加入事件
        io.emit('users', users); // 发送在线用户列表   
    });

    socket.on('get-users', () => {
        socket.emit('users', users);
    });

    // 当某个连接断开时的处理函数
    socket.on('disconnect', () => {
        // 根据页面标识来判断是否发送事件
        const pageId = socket.handshake.query.pageId;
        if (pageId === 'chat-page') {
            console.log('disconncect:' + user1);
            if (user1) {
                const index = users.indexOf(user1);
                if (index !== -1) {
                    users.splice(index, 1);
                    socket.broadcast.emit('user-left', user1); 
                    io.emit('users', users);
                }
            }
        }
    });

    //正在输入中。。
    socket.on('typing', (username) => {
        socket.broadcast.emit('user-typing', username);
    });



});

http.listen(8080, () => {
    console.log('listening on port 8080');
});


