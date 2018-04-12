const expect = require('chai').expect;
const config = require('./config/config');
const io = require('socket.io-client');

const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
  extraHeaders: {},
};
let client;

describe('Socketio Events', () => {
  beforeEach((done) => {
    ioOptions.extraHeaders['X-Real-Ip'] = '192.168.0.2';
    client = io(`http://localhost:${config.node.port}/`, ioOptions);

    done();
  });
  afterEach((done) => {
    client.disconnect();
    done();
  });

  describe('Connection', () => {
    it('Broadcasts add-ip event', (done) => {
      const otherIp = '192.168.0.3';
      client.on('add-ip', (ip) => {
        expect(ip).to.be.a('number');
        done();
      });

      setTimeout(() => {
        ioOptions.extraHeaders['X-Real-Ip'] = otherIp;
        const otherClient = io(`http://localhost:${config.node.port}/`, ioOptions);
        setTimeout(() => { otherClient.disconnect(); }, 3000);
      }, 10000);
    });
  });
});
