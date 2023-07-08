import { Injectable } from "@nestjs/common";
import { LoggerService } from "src/_common/logger/logger.service";
import { PaymentService } from "src/_common/payment/payment.service";
import { UrlUtils } from "src/_common/utils/url-builder";
import { SettingsService } from "src/_common/settings/settings.service";
import { ID } from "src/_common/types";
import { DonationRepository } from "src/donation/donation.repository";

@Injectable()
export class DonationPaymentUsecase {
	constructor(
		private readonly loggerService: LoggerService,
		private readonly donationRepository: DonationRepository,
		private readonly paymentService: PaymentService,
		private readonly settingsService: SettingsService,
		private readonly urlUtils: UrlUtils,
	) { }

	async createPaymentUrl({
		donationId,
		redirectUrlAfterPayment,
		callbackUrlPathAfterPayment,
	}: {
		donationId: ID,
		redirectUrlAfterPayment: string,
		callbackUrlPathAfterPayment: string,
	}): Promise<string> {
		const donation = await this.donationRepository.findOne({
			where: { id: donationId },
		});

		if (!donation) {
			throw new Error(`Donation with id ${donationId} was not found`);
		}

		this.loggerService.info(
			DonationPaymentUsecase.name,
			`Generating redirect url for payment page for created donation.`
		)

		const { id, amount, currency, message } = donation;
		const redirectUrl = await this.paymentService.getRedirectUrlToPaymentPage({
			orderId: id,
			currency,
			amount,
			messageForPayer: message,
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
}