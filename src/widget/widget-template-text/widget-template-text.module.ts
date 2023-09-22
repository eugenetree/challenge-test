import { Module } from '@nestjs/common';
import { WidgetTemplateTextRepository } from './widget-template-text.repository';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [WidgetTemplateTextRepository],
  exports: [WidgetTemplateTextRepository],
})
export class WidgetTemplateTextModule {}
