const redisClient = require('./../../service/redis');

const ipListKey = 'iplist';

module.exports = {
  add: (ip) => {
    return new Promise((resolve, reject) => {
      redisClient.hincrby(ipListKey, ip, 1, (err) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve();
        }
      });
    });
  },
  remove: (ip) => {
    return new Promise((resolve, reject) => {
      redisClient.hget(ipListKey, ip, (err, count) => {
        if (err) {
          reject(new Error(err.message));
        }

        if (count <= 1) {
          redisClient.hdel(ipListKey, ip, (errDel) => {
            if (errDel) {
              reject(new Error(err.message));
            }

            resolve(false);
          });
        } else {
          redisClient.hincrby(ipListKey, ip, -1, (errDel) => {
            if (errDel) {
              reject(new Error(err.message));
            }

            resolve(true);
          });
        }
      });
    });
  },
  exists: (ip) => {
    return new Promise((resolve, reject) => {
      redisClient.hexists(ipListKey, ip, (err, res) => {
        if (err) {
          reject(new Error(err.message));
        }

        resolve(res === 1);
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      redisClient.hgetall(ipListKey, (err, ips) => {
        if (err) {
          reject(new Error(err.message));
        }

        resolve(ips);
      });
    });
  },
};
