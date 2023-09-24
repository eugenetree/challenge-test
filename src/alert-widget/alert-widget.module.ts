import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/_common/database/database.module';
import { AlertWidgetRepository } from './alert-widget.repository';
import { AlertWidgetService } from './alert-widget.service';
import { AlertWidgetController } from './alert-widget.controller';
import { SessionModule } from 'src/auth/session/session.module';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [AlertWidgetRepository, AlertWidgetService],
  exports: [AlertWidgetRepository, AlertWidgetService],
  controllers: [AlertWidgetController],
})
export class AlertWidgetModule {}
