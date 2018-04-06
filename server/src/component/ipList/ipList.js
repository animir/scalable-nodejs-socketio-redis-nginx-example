const redisClient = require('./../../service/redis');

const ipListKey = 'iplist';

module.exports = {
  add: (ip) => {
    redisClient.hincrby(ipListKey, ip, 1);
  },
  remove: (ip, cb) => {
    redisClient.hget(ipListKey, ip, (err, count) => {
      if (count <= 1) {
        redisClient.hdel(ipListKey, ip);
        cb(err, false);
      } else {
        redisClient.hincrby(ipListKey, ip, -1);
        cb(err, true);
      }
    });
  },
  exists: (ip, cb) => {
    redisClient.hexists(ipListKey, ip, (err, res) => {
      cb(err, res === 1);
    });
  },
  getAll: (cb) => {
    redisClient.hgetall(ipListKey, (err, ips) => {
      cb(err, ips);
    });
  },
};
