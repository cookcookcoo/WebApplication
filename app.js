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

io.on('connection', (socket) => {
    // 消息发送处理
    socket.on('send-clicked', (data) => {
        io.emit('send-clicked', data);
    });
    
    // 用户加入处理
    socket.on('join', (username) => {
        console.log("zhendefan");
        console.log('User joined:', username);
        socket.username = username;
        users.push(username);
        socket.broadcast.emit('user-joined', username); // 发送用户加入事件
        io.emit('users', users); // 发送在线用户列表   
    });

    socket.on('get-users', () => {
        socket.emit('users', users);
    });

    // socket.on('disconnect', () => {
    //     console.log('disconncect:'+socket.username);
    //     if (socket.username) {
    //         console.log('pass');
    //         const index = users.indexOf(socket.username);
    //         if (index !== -1) {
    //             users.splice(index, 1);
    //             // io.emit('user-left', socket.username); // 发送用户离开事件
    //             // io.emit('users', users); // 发送在线用户列表
    //             console.log('someone leave');
    //         }
    //     }
    // });


});

http.listen(8080, () => {
    console.log('listening on port 8080');
});


