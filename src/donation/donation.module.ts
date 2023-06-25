import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DatabaseModule } from 'src/_common/database/database.module';
import { DonationRepository } from './donation.repository';
import { DonationController } from './donation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SessionModule } from 'src/auth/session/session.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, SessionModule, UserModule],
  providers: [DonationService, DonationRepository],
  exports: [DonationService, DonationRepository],
  controllers: [DonationController],
})
export class DonationModule { }
