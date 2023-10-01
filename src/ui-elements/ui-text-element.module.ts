import { Module } from '@nestjs/common';
import { UiTextElementRepository } from './ui-text-element.repository';
import { DatabaseModule } from 'src/_common/database/database.module';
import { UiTextElementMapper } from './ui-text-element.mapper';

@Module({
  imports: [DatabaseModule],
  providers: [UiTextElementRepository, UiTextElementMapper],
  exports: [UiTextElementRepository, UiTextElementMapper],
})
export class UiTextElementModule {}
