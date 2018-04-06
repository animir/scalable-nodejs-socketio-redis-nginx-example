const config = require('./../config/config');
const redis = require('redis');

const redisClient = redis.createClient({ host: config.redis.host, port: config.redis.port });

redisClient.on('error', (err) => {
  throw new Error(`Redis error: ${err.message}`);
});

module.exports = redisClient;
