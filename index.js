const PORT = process.env.PORT || 5000
var express = require('express');
var app = express();
var server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
var io = require('socket.io').listen(server);
const path = require('path')
var currentTime;

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('index'))

  io.on('connection', function(socket) {
    socket.on('event', function(msg){
      io.emit('event', msg);
      console.log(msg);
    });
    console.log("A new user connected!");
  });