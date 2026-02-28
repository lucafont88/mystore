import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const cacheRedis = new Redis(redisUrl, {
  db: 1,
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  connectTimeout: 3000,
});

cacheRedis.on('connect', () => {
  console.log('Cache Redis connected (DB 1)');
});

cacheRedis.on('error', (err) => {
  console.error('Cache Redis error:', err.message);
});

// Connect eagerly but don't block startup
cacheRedis.connect().catch(() => {
  console.warn('Cache Redis not available at startup, will retry on demand');
});

export default cacheRedis;
