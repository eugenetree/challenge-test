import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';
import { CreateTestDonationDto, CreateRealDonationDto } from './donation.dto';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';

@Controller('donations')
export class DonationController {
	constructor(
		private readonly donationService: DonationService,
	) { }

	@Post()
	async createRealDonation(
		@Body() dto: CreateRealDonationDto,
	) {
		// TODO: add NotFoundEntityError global handling
		// here is the case where we may try to create donation for non-existing user
		return this.donationService.createRealDonation({ ...dto });
	}

	@UseGuards(AuthSessionGuard)
	@Post('test')
	async createTestDonation(
		@Body() dto: CreateTestDonationDto,
		@UserId() userId: ID,
	) {
		return this.donationService.createTestDonation({
			...dto,
			recipientId: userId,
		})
	}
}