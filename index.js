// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var appEx = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// configuration ===========================================

var db = require('./config/db');

var port = process.env.PORT || 3000;
// mongoose.connect(db.url);

// get all data of body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass application into routes

appEx.get('/', function(req, res){
  res.sendfile(__dirname + '/views/home.html');
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


// start app ===============================================
app.listen(port);
console.log("Awwww yeah, it's all happening at " + port);
// expose app
exports = module.exports = app;
