//initialise Express JS and Socket.IO
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Use the public directory as the static file directory
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
    // Message sending processing
    socket.on('send-clicked', (data) => {
        io.emit('send-clicked', data);
    });

    // User joining process
    socket.on('join', (username) => {
        user1 = username;
        console.log('User joined:', user1);
        users.push(username);
        // Send the user joining event
        socket.broadcast.emit('user-joined', username);
        // Send the online user list
        io.emit('users', users);   
    });

    socket.on('get-users', () => {
        socket.emit('users', users);
    });

    // Handler when a connection is broken
    socket.on('disconnect', () => {
        // Determine whether to send events based on the page ID
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

    //typing processing
    socket.on('typing', (username) => {
        socket.broadcast.emit('user-typing', username);
    });



});

http.listen(8080, () => {
    console.log('listening on port 8080');
});


