var socket_io = require('socket.io'); //requires socket module
var http = require('http'); 
var express = require('express');

var app = express();

//serve public html pages
app.use(express.static('public'));

var server = http.Server(app);//wraps the Express app in a Node http.Server object. This allows Socket to run alongside express

var io = socket_io(server);//initialize  io object by passing the server into the socket_io function. This creates a Socket.IO Server, which is an EventEmitter

io.on('connection', function (socket) {// add a listener to the connection event of the server
    console.log('Client connected');
    
    socket.on('theName', function(theName) {//adds new listener to communicate with client. 
        console.log('Message from:', theName);//when a message with the name "message" is recieved,  it will be printed to console
        socket.broadcast.emit('theName', theName);//this is one way to communicate from server to client. This sends message to all clients except the originator
    });
    
    socket.on('message', function(message) {//adds new listener to communicate with client. 
        console.log('Received message:', message);//when a message with the name "message" is recieved,  it will be printed to console
        socket.broadcast.emit('message', message);//this is one way to communicate from server to client. This sends message to all clients except the originator
    });
});

server.listen(process.env.PORT || 8080); //now calling server.listent, not app.listen