import { Injectable } from '@nestjs/common';
import { DonationRepository } from '../domain/donation.repository.type';
import { Donation } from '../domain/donation';
import { ID } from 'src/_common/types';

@Injectable()
export class DonationsService {
	constructor(
		private readonly donationRepository: DonationRepository,
	) { }

	async updatePaymentStatus(
		id: ID,
		data: {
			status: 'success' | 'fail';
			paymentData: Donation['paymentData']
		}
	) {
		const donation = await this.donationRepository.findOne({ where: { id } });

		if (!donation) {
			throw new Error(`Donation with id ${id} not found`);
		}

		const { status, paymentData } = data;

		if (status === 'success') {
			donation.markSuccessfulPayment({ paymentData })
		}

		if (status === 'fail') {
			donation.markFailedPayment();
		}

		return this.donationRepository.updateOne({ data: donation });
	}
}
