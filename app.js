//variables
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var whois = require('node-xwhois');
var cookieParser = require('cookie-parser');
var ioidhostname = [];
var hostname = null;
var resolved = null
//app config
app.use(cookieParser());
//server init
server.listen(80);
console.log('Here we are again listening on port 80');
//routes

app.get('/', function (req, res) {
  	ip = req.ip;
      simpleip = ip.substr(7);
      resolved = dnsResolve(simpleip);
      console.log('requst ip ' + simpleip);
      console.log('dns reolved hostname ' + resolved);
      if (resolved != null || resolved != '') {
      res.cookie('TNTscale',resolved);
      res.sendFile(__dirname + '/index.html');
      }
      else {
      res.sendFile(__dirname + '/index.html');  	  
}
});

//events
io.on('connection', function (socket) {
    socket.on('creategroup',function(username){
    	socket.join(username);
    })
  })

//helping functions
function dnsResolve(ip) {
      whois.reverse(ip)
      .then(hostnames => hostname = hostnames);
      if (hostname === null) {
      	whois.reverse(ip)
      .then(hostnames => hostname = hostnames);
      }
      else {
      return hostname;
   }
 }