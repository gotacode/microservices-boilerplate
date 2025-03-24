import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rlflx',
  points: 10,
  duration: 1
});

export const rateLimit = (options = {}) => {
  const limiter = options.points
    ? new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: `rlflx_custom_${options.points}`,
        points: options.points,
        duration: options.duration || 1
      })
    : rateLimiter;

  return async (req, res, next) => {
    try {
      await limiter.consume(req.ip);
      next();
    } catch {
      res.status(429).json({ error: 'Too Many Requests' });
    }
  };
};
