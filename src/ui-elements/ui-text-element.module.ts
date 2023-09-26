import { Module } from '@nestjs/common';
import { UiTextElementRepository } from './ui-text-element.repository';
import { DatabaseModule } from 'src/_common/database/database.module';
import { UiTextElementTransformer } from './ui-text-element.transformer';

@Module({
  imports: [DatabaseModule],
  providers: [UiTextElementRepository, UiTextElementTransformer],
  exports: [UiTextElementRepository, UiTextElementTransformer],
})
export class UiTextElementModule {}
