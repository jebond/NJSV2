//variables
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var whois = require('node-xwhois');
var cookieParser = require('cookie-parser');
var ioidhostname = {};
//app config
app.use(cookieParser());
//server init
server.listen(80);
console.log('Here we are again listening on port 80');
//routes
app.get('/', function (req, res) {
  ip = req.ip;
      simpleip = ip.substr(7);
      console.log(simpleip);
      whois.reverse(simpleip)
      .then(hostnames => hostname = hostnames);
  var sessionid = req.cookies;
  ioidhostname.push(sessionid => hostname);
  res.sendFile(__dirname + '/index.html');
  res.cookie('TNTScale',hostname);
});
//events
io.on('connection', function (socket) {
  socket.emit('hostinformation', { 
  	hostname: ioidhostname });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('join',function(data){
  console.log(ioidhostname);
  })
});