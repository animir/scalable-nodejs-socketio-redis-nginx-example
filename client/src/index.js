import io from 'socket.io-client';
import IpList from './component/IpList';

const list = new IpList(document, 'ip-list');

const socket = io(`${window.location.hostname}`, {
  transports: ['websocket'],
});

socket.on('connected', (ips) => {
  Object.keys(ips).forEach((ip) => {
    list.addIpToList(ip);
  });
});

socket.on('disconnect', () => {
  list.clearIpList();
});

socket.on('add-ip', (ip) => {
  list.addIpToList(ip);
});

socket.on('remove-ip', (ip) => {
  list.removeIpFromList(ip);
});
