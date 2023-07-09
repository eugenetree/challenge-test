import { Module, forwardRef } from '@nestjs/common';
import { DonationUsecase } from './donation.usecase';
import { DatabaseModule } from 'src/_common/database/database.module';
import { DonationRepository } from './donation.repository';
import { DonationController } from './donation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SessionModule } from 'src/auth/session/session.module';
import { UserModule } from 'src/user/user.module';
import { DonationNotifierModule } from 'src/donation-notifier/donation-notifier.module';

@Module({
  imports: [DatabaseModule, AuthModule, SessionModule, UserModule, forwardRef(() => DonationNotifierModule)],
  providers: [DonationUsecase, DonationRepository],
  exports: [DonationUsecase, DonationRepository],
  controllers: [DonationController],
})
export class DonationModule { }
