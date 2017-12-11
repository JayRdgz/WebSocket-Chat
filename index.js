const express = require('express');
const socket  = require('socket.io');

// App setup
const app = express();
const PORT = 4000;
let server = app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});

// static files
app.use(express.static('public'));


// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Client connected ID: ', socket.id);

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});
