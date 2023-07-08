import { Module } from '@nestjs/common';
import { DonationPaymentUsecase } from './donation-payment.usecase';
import { DonationPaymentController } from './donation-payment.controller';
import { LoggerModule } from 'src/_common/logger/logger.module';
import { DonationModule } from 'src/donation/donation.module';
import { PaymentModule } from 'src/_common/payment/payment.module';
import { SettingsModule } from 'src/_common/settings/settings.module';
import { UtilsModule } from 'src/_common/utils/utils.module';

@Module({
  imports: [LoggerModule, SettingsModule, UtilsModule, DonationModule, PaymentModule],
  providers: [DonationPaymentUsecase],
  exports: [DonationPaymentUsecase],
	controllers: [DonationPaymentController],
})
export class DonationPaymentModule { }
