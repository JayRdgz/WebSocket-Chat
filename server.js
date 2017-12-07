const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io').listen(server);
const cheerio = require('cheerio');
const request = require('request');

const $ = cheerio.load(body);

users        = [];
connections  = [];


server.listen(process.env.PORT || 3000);
console.log('Server on');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('connected: %s sockets connected: ', connections.length);

    // disconnect
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('disconnect: %s sockets connected: ', connections.length);
    })

    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data});
    })
});
