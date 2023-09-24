import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({ url: 'redis://redis:6379' });
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({ client: redisClient });

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use = session({
    secret: 'a santa at nasa',
    resave: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    store: redisStore,
    saveUninitialized: false,
  });
}
