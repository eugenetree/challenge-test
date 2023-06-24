import { Module } from '@nestjs/common';
import { UrlUtils } from './url-builder';

@Module({
  providers: [UrlUtils],
  exports: [UrlUtils],
})
export class UtilsModule {}
