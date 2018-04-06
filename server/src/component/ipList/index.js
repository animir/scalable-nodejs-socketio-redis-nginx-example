const ipList = require('./ipList');

module.exports = {
  add: ipList.add,
  remove: ipList.remove,
  exists: ipList.exists,
  getAll: ipList.getAll,
};
