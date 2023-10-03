import { Module, OnModuleInit } from '@nestjs/common';
import { DonationAlertTemplateService } from './donation-alert-template.service';
import { UiTextElementModule } from 'src/ui-elements/ui-text-element.module';
import { DonationAlertTemplateRepository } from './donation-alert-template.repository';
import { DatabaseModule } from 'src/_common/database/database.module';
import { SessionModule } from 'src/auth/session/session.module';
import { DonationAlertTemplateController } from './donation-alert-template.controller';
import { DonationAlertTemplateMapper } from './donation-alert-template.mapper';

@Module({
  imports: [UiTextElementModule, DatabaseModule, SessionModule],
  controllers: [DonationAlertTemplateController],
  providers: [
    DonationAlertTemplateService,
    DonationAlertTemplateRepository,
    DonationAlertTemplateMapper,
  ],
  exports: [DonationAlertTemplateService, DonationAlertTemplateMapper],
})
export class DonationAlertTemplateModule {}
