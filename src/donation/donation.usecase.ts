import { Injectable } from '@nestjs/common';
import { Donation } from './donation';
import { DonationRepository } from './donation.repository';
import { CreateRealDonationDto, CreateTestDonationDto } from './donation.dto';
import { ID } from 'src/_common/types';
import { UserRepository } from 'src/user/user.repository';
import { DonationNotifierService } from 'src/donation-notifier/donation-notifier.service';

@Injectable()
export class DonationUsecase {
	constructor(
		private readonly donationRepository: DonationRepository,
		private readonly userRepository: UserRepository,
		private readonly donationNotifierService: DonationNotifierService,
	) { }

	findOne = async ({ where }: { where: Partial<Donation> }) => {
		return await this.donationRepository.findOne({ where });
	}

	createRealDonation = async (input: CreateRealDonationDto): Promise<Donation> => {
		const recipient = await this.userRepository.findOne({ where: { id: input.recipientId } });

		if (!recipient) {
			throw new Error(`Recipient with id ${input.recipientId} was not found`)
		}

		return await this.donationRepository.create({
			data: new Donation({
				...input,
			}),
		})
	};

	createTestDonation = async (input: CreateTestDonationDto & { recipientId: ID }): Promise<Donation> => {
		const donation = await this.donationRepository.create({
			data: new Donation({ ...input, paymentSystem: 'test' }),
		});

		await this.donationNotifierService.notify(donation);

		return donation;
	};

	processSuccessfulDonation = async (donationId: ID, paymentData: Record<string, unknown>): Promise<void> => {
		const donation = await this.donationRepository.findOne({ where: { id: donationId } });

		if (!donation) {
			throw new Error(`Donation with id ${donationId} not found`);
		};

		await this.donationRepository.updateOne(donation.id, {
			data: {
				paymentStatus: 'success',
				paymentData,
			}
		});

		await this.donationNotifierService.notify(donation);
	}
}
