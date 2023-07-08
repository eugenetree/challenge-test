import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DonationUsecase } from './donation.usecase';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';
import { CreateTestDonationDto, CreateRealDonationDto } from './donation.dto';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';

@Controller('donations')
export class DonationController {
	constructor(
		private readonly donationUsecase: DonationUsecase,
	) { }

	@Post()
	async createRealDonation(
		@Body() dto: CreateRealDonationDto,
	) {
		return this.donationUsecase.createRealDonation({ ...dto });
	}

	@UseGuards(AuthSessionGuard)
	@Post('test')
	async createTestDonation(
		@Body() dto: CreateTestDonationDto,
		@UserId() userId: ID,
	) {
		return this.donationUsecase.createTestDonation({
			...dto,
			recipientId: userId,
		})
	}
}