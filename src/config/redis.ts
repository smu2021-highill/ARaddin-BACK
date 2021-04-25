import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const redisClient = redis.createClient(6379, 'localhost');

const redisStore = connectRedis(session);
export const sess = {
  resave: false,
  saveUninitialized: false,
  secret: 'dw',
  // name: 'sessionId',
  store: new redisStore({ client: redisClient, ttl: 2600, logErrors: true }),
};
