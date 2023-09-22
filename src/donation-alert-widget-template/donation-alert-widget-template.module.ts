import { Module, OnModuleInit } from '@nestjs/common';
import { DonationAlertWidgetTemplateService } from './donation-alert-widget-template.service';
import { WidgetTemplateTextModule } from 'src/widget/widget-template-text/widget-template-text.module';
import { DonationAlertWidgetTemplateRepository } from './donation-alert-widget-template.repository';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [WidgetTemplateTextModule, DatabaseModule],
  providers: [
    DonationAlertWidgetTemplateService,
    DonationAlertWidgetTemplateRepository,
  ],
  exports: [DonationAlertWidgetTemplateService],
})
export class DonationAlertWidgetTemplateModule {}
