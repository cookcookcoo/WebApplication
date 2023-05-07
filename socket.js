//initialise Express JS and Socket.IO
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//send index.html when a user connects to the server
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html');
});

//the callback runs when user connects
io.on('connection', (socket) => {
    console.log('A user connected'); 
    socket.on('disconnect', () => {
        console.log('A user disconnected'); 
    });
    socket.on('send-clicked', (value) => {
        console.log('send clicked');
        io.emit('send-clicked', value);
    });
    socket.on('join-clicked', (value) => {
        console.log('join clicked');
        io.emit('join-clicked', value);
    });
});

http.listen(8080, () => {
    console.log('listening on port 8080?');
});