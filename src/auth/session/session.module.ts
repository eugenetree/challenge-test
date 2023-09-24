import { Module, NestModule } from '@nestjs/common';

import { SessionService } from './session.service';
import { SessionMiddleware } from './session.middleware';

@Module({
  exports: [SessionService],
  providers: [SessionService],
})
export class SessionModule implements NestModule {
  configure: NestModule['configure'] = (consumer) => {
    consumer.apply(SessionMiddleware).forRoutes('*');
  };
}
