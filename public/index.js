const socket = io(`${window.location.hostname}:3000`, {
  transports: ['websocket'],
});

socket.on('add-ip', (data) => {
  console.log(data);
});
