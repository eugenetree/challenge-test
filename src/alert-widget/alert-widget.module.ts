import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/_common/database/database.module';
import { AlertWidgetRepository } from './alert-widget.repository';
import { AlertWidgetService } from './alert-widget.service';
import { AlertWidgetController } from './alert-widget.controller';
import { SessionModule } from 'src/auth/session/session.module';
import { UiTextElementModule } from 'src/ui-elements/ui-text-element.module';
import { AlertWidgetMapper } from './alert-widget.mapper';

@Module({
  imports: [DatabaseModule, SessionModule, UiTextElementModule],
  providers: [AlertWidgetRepository, AlertWidgetService, AlertWidgetMapper],
  exports: [AlertWidgetRepository, AlertWidgetService],
  controllers: [AlertWidgetController],
})
export class AlertWidgetModule {}
