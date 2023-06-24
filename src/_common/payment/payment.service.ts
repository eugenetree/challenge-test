import { Injectable } from "@nestjs/common";
import * as Fondy from "cloudipsp-node-js-sdk";

@Injectable()
export class PaymentService {
	private readonly fondyClient = new Fondy({
		merchantId: 1396424,
		secretKey: 'test'
	})

	constructor(
	) { }

	async getRedirectUrlToPaymentPage({
		redirectUrlAfterPayment,
		callbackUrlAfterPayment,
		messageForPayer,
		orderId,
		amount,
		currency,
	}: {
		redirectUrlAfterPayment: string;
		callbackUrlAfterPayment: string;
		messageForPayer: string;
		orderId: string;
		amount: number;
		currency: string;
	}) {
		const res = await this.fondyClient.Checkout({
			order_id: orderId,
			order_desc: messageForPayer,
			amount,
			currency,
			response_url: redirectUrlAfterPayment,
			server_callback_url: callbackUrlAfterPayment,
		});

		return res.checkout_url;
	}
}