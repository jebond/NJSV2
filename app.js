//variables
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var whois = require('node-xwhois');
var cookieParser = require('cookie-parser');
var dns = require('dns');
var ioidhostname = [];
var hostname = null;
//app config
app.use(cookieParser());
//server init
server.listen(80);
console.log('Here we are again listening on port 80');
//routes

app.get('/', function (req, res) {
  	ip = req.ip;
      simpleip = ip.substr(7);
      var resolved = dnsResolve(simpleip,res);
      if (isset(resolved))
      res.sendFile(__dirname + '/index.html');
      else
      res.sendFile(__dirname + '/index.html');  	  
});

//events
io.on('connection', function (socket) {
  socket.emit('hostinformation', { 
  	hostname: ioidhostname });
  socket.on('room', function (data) {
    socket.join(cook);
  });
});

//helping functions
function dnsResolve(ip,res) {
dns.reverse(ip, function(domains) {
  	  res.cookie('TNTScale',domains);
  	})
return domains;
}