import { Module, OnModuleInit } from '@nestjs/common';
import { DonationAlertTemplateService } from './donation-alert-template.service';
import { WidgetTemplateTextModule } from 'src/widget/widget-template-text/widget-template-text.module';
import { DonationAlertTemplateRepository } from './donation-alert-template.repository';
import { DatabaseModule } from 'src/_common/database/database.module';
import { SessionModule } from 'src/auth/session/session.module';
import { DonationAlertTemplateController } from './donation-alert-template.controller';

@Module({
  imports: [WidgetTemplateTextModule, DatabaseModule, SessionModule],
  controllers: [DonationAlertTemplateController],
  providers: [DonationAlertTemplateService, DonationAlertTemplateRepository],
  exports: [DonationAlertTemplateService],
})
export class DonationAlertTemplateModule {}
