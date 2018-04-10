const redisMock = require('redis-mock');
const expect = require('chai').expect;
const ipList = require('./ipList');

const redisMockClient = redisMock.createClient();
const ipListKey = 'iplisttest';
ipList.initList(redisMockClient, ipListKey);

describe('ipList', () => {
  describe('add(ip)', () => {
    it('should add ip to redis hash', (done) => {
      ipList.add('127.0.0.1').then(() => {
        redisMockClient.hexists(ipListKey, '127.0.0.1', (err, res) => {
          expect(res).to.be.equal(1);
          done();
        });
      });
    });
  });

  describe('remove(ip)', () => {
    it('should remove ip from redis hash', (done) => {
      ipList.remove('127.0.0.1').then(() => {
        redisMockClient.hexists(ipListKey, '127.0.0.1', (err, res) => {
          expect(res).to.be.equal(0);
          done();
        });
      });
    });

    context('the same ip added twice', () => {
      it('should decrement ip counter in redis hash', (done) => {
        const first = new Promise((res, rej) => {
          redisMockClient.hincrby(ipListKey, '127.0.0.1', 1, () => {
            res();
          });
        });
        const second = new Promise((res, rej) => {
          redisMockClient.hincrby(ipListKey, '127.0.0.1', 1, () => {
            res();
          });
        });

        Promise.all([first, second]).then(() => {
          ipList.remove('127.0.0.1').then(() => {
            redisMockClient.hget(ipListKey, '127.0.0.1', (err, res) => {
              expect(Number(res)).to.be.equal(1);
              done();
            });
          });
        });
      });
    });
  });
});
