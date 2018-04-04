const addIpToList = (ip) => {
  const node = document.createElement('div');
  node.setAttribute('id', ip);
  node.appendChild(document.createTextNode(ip));
  document.getElementById('ip-list').appendChild(node);
};

const removeIpFromList = (ip) => {
  document.getElementById(ip).remove();
};

const clearIpList = () => {
  document.getElementById('ip-list').innerHTML = '';
};

const socket = io(`${window.location.hostname}:3000`, {
  transports: ['websocket'],
});

socket.on('connected', (ips) => {
  Object.keys(ips).forEach((ip) => {
    addIpToList(ip);
  });
});

socket.on('disconnect', () => {
  clearIpList();
});

socket.on('add-ip', (ip) => {
  addIpToList(ip);
});

socket.on('remove-ip', (ip) => {
  removeIpFromList(ip);
});
