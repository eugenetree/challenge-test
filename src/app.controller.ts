import { Controller, Get } from "@nestjs/common";
import { DonationNotifierService } from "./donation-notifier/donation-notifier.service";

@Controller()
export class AppController {
	constructor(
		private readonly donationNotifierService: DonationNotifierService,
	) { }

	@Get()
	async getHello() {
		return await this.donationNotifierService.notify('1ba40dff-f10d-4872-9c0d-26922ab28992')
	}
}