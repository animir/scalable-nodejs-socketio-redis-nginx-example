const redisClient = require('./../../service/redis');
const ipList = require('./ipList');

ipList.initList(redisClient);

module.exports = {
  add: ipList.add,
  remove: ipList.remove,
  exists: ipList.exists,
  getAll: ipList.getAll,
};
