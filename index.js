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
  }) // add additional logic

  socket.on('sync board', function(board) {
    console.log('updating board');
    io.emit('sync board', board);
  })
  socket.on('winner info', function(winner) {
    console.log('updating winner text');
    io.emit('winner info', winner);
  })
  socket.on('reset game', function () {
    console.log('resetting game');
    io.emit('reset game');
  });
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
