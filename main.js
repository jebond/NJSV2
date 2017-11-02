$(function() {
  var $window = $(window);
  var socket = io();
  var username = '';
  var connected = true;
  var typing = false;
  var resstatus;
  var ipaddress;
  var TNTCookie;  

  setSocketName();

  function setSocketName () {
    jQuery.get('http://10.101.1.213:3001/gethostname/',function(data,status)
      {
        username = data.hostname[0];
        ipaddress = data.ipaddress;
		TNTCookie = $.cookie('TNTCookie');
		io.connect('http://10.101.1.213:3001');
		socket.emit('add user', TNTCookie);
      })
    }

  function addWeight (data, options) {
    $(".shipweight").val(data.message);
  }

  socket.on('new message', function (data) {
    addWeight(data);
  });

  socket.on('disconnect', function () {
    log('you have been disconnected, you ass!');
  });

  socket.on('reconnect', function () {
    log('you have been reconnected, finally. Ass!');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', function () {
    log('attempt to reconnect has failed, suites you right. Ass!');
  });
});
