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
      var hostname = whois.reverse(simpleip)
      console.log(hostname);
      //.then(hostnames => hostname = hostnames);
  var cook = cookieParser.JSONCookies(req.cookies['TNTScale']);
  var sessionid = cook;
  ioidhostname.push({"hostname": hostname,"sessionid":sessionid});
  res.sendFile(__dirname + '/index.html');
  res.cookie('TNTScale',hostname);
  //console.log(ioidhostname);
});

//postroute for the service
app.post('/addweight/', function(req, res) {
    var weight = req.body.weight;
    var computername = req.body.computername;
      socket.to(computername).emit('new message',{
      username : computername,
      message : weight,
      computername : computername

});
    res.sendStatus(200);
});


//events
io.on('connection', function (socket) {
  socket.emit('hostinformation', { 
  	hostname: ioidhostname });
  socket.on('room', function (data) {
    socket.join(cook);
  });
});