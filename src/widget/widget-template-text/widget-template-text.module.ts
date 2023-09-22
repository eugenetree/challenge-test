import { Module } from '@nestjs/common';
import { WidgetTemplateTextRepository } from './widget-template-text.repository';
import { DatabaseModule } from 'src/_common/database/database.module';
import { WidgetTemplateTextTransformer } from './widget-template-text.transformer';

@Module({
  imports: [DatabaseModule],
  providers: [WidgetTemplateTextRepository, WidgetTemplateTextTransformer],
  exports: [WidgetTemplateTextRepository, WidgetTemplateTextTransformer],
})
export class WidgetTemplateTextModule {}
