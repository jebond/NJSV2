var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var whois = require('node-xwhois');

server.listen(80);
console.log('Here we are again listening on port 80');

app.get('/', function (req, res) {
  ip = req.ip;
      simpleip = ip.substr(7);
      whois.reverse(simpleip)
      .then(hostnames => hostname = hostnames);
  res.sendFile(__dirname + '/index.html');
  res.cookie('TNTScale',hostname);
});

io.on('connection', function (socket) {
  var parse = cookie.parse(socket.handshake.headers.cookie);
  socket.emit('hostinformation', { 
  	hostname: parse });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('add user',function(data){

  })
});