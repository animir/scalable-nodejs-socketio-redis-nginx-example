const app = require('http').createServer();
const io = require('socket.io')(app);

app.listen(process.env.SOCKET_SERVER_PORT || 3000);

io.on('connection', (socket) => {
  socket.emit('add-ip', { ip: '0.0.0.0' });
});
