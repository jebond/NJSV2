//variables
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var whois = require('node-xwhois');
var cookieParser = require('cookie-parser');
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
      whois.reverse(simpleip)
      .then(hostnames => hostname = hostnames);
  var cook = cookieParser.JSONCookies(req.cookies);
  console.log(cook);
  var sessionid = cook;
  ioidhostname.push({"hostname": hostname,"sessionid":sessionid});
  res.sendFile(__dirname + '/index.html');
  res.cookie('TNTScale',hostname,{http:true});
  //console.log(ioidhostname);
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