var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  })
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
