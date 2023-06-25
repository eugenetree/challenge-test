import { Injectable, NestMiddleware } from '@nestjs/common';
import session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use = session({
    secret: 'a santa at nasa',
    resave: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
}
