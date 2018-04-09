const config = require('./config/config');
const app = require('http').createServer();
const socketioRedis = require('socket.io-redis');
const io = require('socket.io')(app);
const ipList = require('./component/ipList');

process.on('unhandledRejection', (reason) => {
  throw reason;
});
process.on('uncaughtException', (err) => {
  console.log(err);
});

io.adapter(socketioRedis({ host: config.redis.host, port: config.redis.port }));

app.listen(config.node.port, '0.0.0.0');

io.on('connection', (socket) => {
  // fake ip changed every 10 seconds, which simplify testing in one browser
  socket.clientIp = Math.round((new Date()).getTime() / 10000);

  // socket.clientIp = socket.handshake.headers['x-real-ip'];

  // Send to all except current
  ipList.exists(socket.clientIp).then((exists) => {
    if (!exists) {
      socket.broadcast.emit('add-ip', socket.clientIp);
    }
  }).catch((err) => { throw err; });

  ipList.add(socket.clientIp).then(() => {
    // Send full list to current
    ipList.getAll().then((ips) => {
      socket.emit('connected', ips);
    }).catch((err) => { throw err; });
  }).catch((err) => { throw err; });


  socket.on('disconnect', () => {
    ipList.remove(socket.clientIp).then((stillExists) => {
      if (!stillExists) {
        io.sockets.emit('remove-ip', socket.clientIp);
      }
    }).catch((err) => { throw err; });
  });
});
