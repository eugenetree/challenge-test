import { Module } from '@nestjs/common';
import { DonationAlertRepository } from './donation-alert.repository';
import { DatabaseModule } from 'src/_common/database/database.module';
import { DonationAlertController } from './donation-alert.controller';
import { DonationAlertService } from './donation-alert.service';
import { SessionModule } from 'src/auth/session/session.module';
import { DonationAlertTemplateModule } from 'src/donation-alert-template/donation-alert-template.module';

@Module({
  imports: [DatabaseModule, SessionModule, DonationAlertTemplateModule],
  providers: [DonationAlertRepository, DonationAlertService],
  exports: [DonationAlertRepository, DonationAlertService],
  controllers: [DonationAlertController],
})
export class DonationAlertModule {}
