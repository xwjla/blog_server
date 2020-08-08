var socket_io = require('socket.io');

var socketIo = {};

// 获取io

socketIo.getSocketio = function(server){ // http(s) server

  global.io = socket_io.listen(server,{
    origins: '*:*',
    transports:['websocket', 'xhr-polling']
  });

  global.io.sockets.on('connection', function (socket) {

    console.log('a user connected');
    socket.on('new message', function (id,data) {
      // 广播给用户执行“new message”
      socket.emit('new message', {b:1});
    });

    // 当客户端发出“add user”时，服务端监听到并执行相关代码
    socket.on('add user', function (username) {
      socket.username = username;
      //服务端告诉当前用户执行'login'指令
      socket.emit('login', {});
    });

    // 当用户断开时执行此指令
    socket.on('disconnect', function () {});

  })

};

module.exports = socketIo;
