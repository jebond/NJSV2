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
    var TNTCookie = Cookies.get('TNTScale');
    socket.connect('http://10.101.1.213');
    socket.emit('creategroup',TNTCookie);
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
