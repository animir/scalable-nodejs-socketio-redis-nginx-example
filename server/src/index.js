const config = require('./config/config');
const app = require('http').createServer();
const socketioRedis = require('socket.io-redis');
const io = require('socket.io')(app);
const ipList = require('./component/ipList');

io.adapter(socketioRedis({ host: config.redis.host, port: config.redis.port }));

app.listen(config.node.port, '0.0.0.0');

io.on('connection', (socket) => {
  // fake ip changed every 10 seconds, which simplify testing in one browser
  socket.clientIp = Math.round((new Date()).getTime() / 10000);

  // socket.clientIp = socket.handshake.headers['x-real-ip'];

  // Send to all except current
  ipList.exists(socket.clientIp, (err, exists) => {
    if (!exists) {
      socket.broadcast.emit('add-ip', socket.clientIp);
    }
  });

  ipList.add(socket.clientIp);
  // Send full list to current
  ipList.getAll((err, ips) => {
    socket.emit('connected', ips);
  });

  socket.on('disconnect', () => {
    ipList.remove(socket.clientIp, (err, stillExists) => {
      if (!stillExists) {
        io.sockets.emit('remove-ip', socket.clientIp);
      }
    });
  });
});
