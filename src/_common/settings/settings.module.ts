import { Module, OnModuleInit } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Module({
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule implements OnModuleInit {
  constructor(private settingsService: SettingsService) { }

  async onModuleInit() {
    await this.settingsService.init();
  }
}
