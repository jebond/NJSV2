//variables
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var whois = require('node-xwhois');
var cookieParser = require('cookie-parser');
var ioidhostname = [];
var bodyParser = require('body-parser')
var path = require('path');
var hostname = null;
var resolved = null;
//app config
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

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

//postroute for the service
app.post('/addweight/', function(req, res) {

    var weight = req.body.weight;
    var computername = req.body.computername;
    console.log(weight);
    console.log(computername);
    io.sockets.to(computername).emit('new message',{
    username : computername,
    message : weight,
    computername : computername
});
    res.sendStatus(200);
});

//events
io.on('connection', function (socket) {
  
  socket.on('creategroup',function(data){
    	console.log('hello from on.connection');
    	socket.join(data.roomname);
    })
  
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
})

//helping functions
function dnsResolve(ip) {
      whois.reverse(ip)
      .then(hostnames => hostname = hostnames);
      if (hostname === null || hostname === undefined || hostname === "undefined") {
      	whois.reverse(ip)
      .then(hostnames => hostname = hostnames);
      }
      else {
      return hostname;
   }
 }