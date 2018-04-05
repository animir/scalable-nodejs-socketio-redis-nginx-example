const app = require('http').createServer();
const redis = require('socket.io-redis');
const io = require('socket.io')(app);

io.adapter(redis({ host: 'redis', port: 6379 }));

const ips = {};

app.listen(process.env.NODE_PORT || 3000, '0.0.0.0');

io.on('connection', (socket) => {
  // fake ip changed every 10 seconds, which simplify testing in one browser
  socket.clientIp = Math.round((new Date()).getTime() / 10000);

  // socket.clientIp = socket.handshake.headers['x-real-ip'];

  // Send to all except current
  if (typeof ips[socket.clientIp] === 'undefined') {
    socket.broadcast.emit('add-ip', socket.clientIp);
  }

  ips[socket.clientIp] = socket.clientIp;
  // Send full list to current
  socket.emit('connected', ips);

  socket.on('disconnect', () => {
    let emitRemoveIp = true;
    Object.keys(io.sockets.sockets).forEach((socketKey) => {
      if (io.sockets.sockets[socketKey].clientIp === socket.clientIp && io.sockets.sockets[socketKey].id !== socket.id) {
        emitRemoveIp = false;
      }
    });

    if (emitRemoveIp) {
      io.sockets.emit('remove-ip', socket.clientIp);
      delete ips[socket.clientIp];
    }
  });
});
