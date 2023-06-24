import { Injectable } from "@nestjs/common";
import { DonationRepository } from "src/donation/domain/donation.repository.type";
import { Donation, DonationInputParams } from "src/donation/domain/donation";
import { LoggerService } from "src/_common/logger/logger.service";
import { PaymentService } from "src/_common/payment/payment.service";
import { UrlUtils } from "src/_common/utils/url-builder";
import { SettingsService } from "src/_common/settings/settings.service";
import { ID } from "src/_common/types";

@Injectable()
export class DonationPaymentService {
	constructor(
		private readonly loggerService: LoggerService,
		private readonly donationRepository: DonationRepository,
		private readonly paymentService: PaymentService,
		private readonly settingsService: SettingsService,
		private readonly urlUtils: UrlUtils,
	) { }

	async createRedirectUrlToPaymentPage({
		donationInput,
		redirectUrlAfterPayment,
		callbackUrlPathAfterPayment,
	}: {
		donationInput: Omit<DonationInputParams, 'id'>,
		redirectUrlAfterPayment: string,
		callbackUrlPathAfterPayment: string,
	}): Promise<string> {
		const createdDonation = await this.donationRepository.create({
			data: new Donation(donationInput),
		});

		this.loggerService.info(
			DonationPaymentService.name,
			`Donation record was created: ${JSON.stringify(createdDonation)}.
			Now generating redirect url for payment page for created donation.`
		)

		const { id, amount, currency } = createdDonation;
		const redirectUrl = await this.paymentService.getRedirectUrlToPaymentPage({
			orderId: id,
			currency,
			amount,
			messageForPayer: 'Donation',
			redirectUrlAfterPayment: this.urlUtils.buildUrl({
				url: redirectUrlAfterPayment,
				query: { id },
			}),
			callbackUrlAfterPayment: this.urlUtils.buildUrl({
				url: `${this.settingsService.BACK_APP_URL}/${callbackUrlPathAfterPayment}`,
				query: { id },
			}),
		});

		return redirectUrl;
	}

	async handleSuccessCallback({ id, paymentData }: { id: ID, paymentData: Record<string, unknown> }) {
		const donation = await this.donationRepository.findOne({ where: { id } });

		if (!donation) {
			throw new Error(`Donation with id ${id} was not found`);
		}

		donation.markSuccessfulPayment({ paymentData });
		await this.donationRepository.updateOne({ data: donation });
	}
}