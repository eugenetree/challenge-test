import { Module } from '@nestjs/common';
import { DonationsService } from './application/donation.service';
import { DatabaseModule } from 'src/_common/database/database.module';
import { DonationRepository } from './domain/donation.repository.type';
import { BaseDonationRepository } from './infrastructure/donation.repository';

const shared = [
	{
		provide: DonationRepository,
		useClass: BaseDonationRepository,
	},
]

@Module({
  imports: [DatabaseModule],
  providers: [DonationsService, ...shared],
  exports: [DonationsService, ...shared],
})
export class DonationModule { }
