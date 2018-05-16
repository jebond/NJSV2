//variables
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{origins: 'https://service.trollandtoad.com:443 https://newservice.trollandtoad.com:443',rejectUnauthorized: false,  transports: ['websocket', 'polling']});
var whois = require('node-xwhois');
var cookieParser = require('cookie-parser');
var ioidhostname = [];
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var hostname = null;
var resolved = null;
const fs = require('fs');
var debug = false;
var dns = require('dns');
var newresolved;

app.use(cookieParser());
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(cors({
  origin: "*"
}))

//server init
server.listen(3000);
//routes

app.get('/',function (req, res) {
      resolved = null;
      ip = req.headers['x-real-ip'];
      if(ip != "12.230.227.26") {
        if(debug == true) {fs.appendFile('/home/jebond/get.log','Get Request from: '+req.headers['x-real-ip']+'\n',(err) => {
          if (err) throw err;
        })}
        console.log('Get Request from: '+req.headers['x-real-ip']);

        whois.reverse(ip)
          .then(hostnames => {
            if (hostnames != null || hostnames != '') {
              res.setHeader('Access-Control-Expose-Headers', 'hostnames');
              res.setHeader("hostname", "'" + hostnames + "'");            
              res.cookie('TNTscale',hostnames);            
              res.sendFile(__dirname + '/index.html');  
            } else {
              res.sendFile(__dirname + '/index.html');  
            }
          }).catch(err => {
            res.sendFile(__dirname + '/index.html'); 
          });
        
	}
        else {
        res.sendFile(__dirname + '/index.html');  
}})

//postroute for the service
app.post('/addweight/', function(req, res) {
    var weight = req.body.weight;
    var computername = req.body.computername;
    var decimalarray = weight.split('.');
    var ouncescalc = decimalarray[1] * .01;
    if(debug == true) {fs.appendFile('/home/jebond/addweight.log','Scale weight from '+computername+'\n' ,(err) => {
          if (err) throw err;
        })}
    console.log('Scale weight from '+computername);
    io.sockets.in(computername).emit('new message',{
    username : computername,
    message : weight,
    pounds : decimalarray[0],
    ounces : ouncescalc * 16,
    computername : computername
});
    res.sendStatus(200);
});

//events
io.on('connection', function (socket) {
  socket.on('creategroup',function(data){
      socket.join(data.roomname);
    })
});

//helping functions
function dnsResolve(ip) {
      whois.reverse(ip)
      .then(hostnames => hostname = hostnames);
      //if (hostname === null || hostname === undefined || hostname === "undefined") {
      //	whois.reverse(ip)
      //.then(hostnames => hostname = hostnames);
      //}
      //else {
      if(debug == true) {fs.appendFile('/home/jebond/dnsresolution.log','dns hostname resolution from ip ' + ip + ' HostNameResolution ' + hostname+'\n' ,(err) => {
          if (err) throw err;
        })}
          console.log('dns hostname resolution from ip ' +ip + ' HostNameResolution ' + hostname);
      return hostname;
   }

  function dnsresolution (ip,callback) {
  dns.reverse(ip,function (err,domains){
    if(err) {
      callback(err);
    }
      console.log('dns hostname resolution from ip ' +ip + ' HostNameResolution ' + domains[0]);
      callback(domains);
     })
};

 //}
