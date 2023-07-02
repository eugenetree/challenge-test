import { Injectable } from "@nestjs/common";
import { DonationAlertWidget, DonationAlertWidgetInputParams } from "./donation-alert-widget";
import { DonationAlertWidgetRepository } from "./donation-alert-widget.repository";
import { ID } from "src/_common/types";

@Injectable()
export class DonationAlertWidgetService {
	constructor(
		private readonly donationAlertWidgetRepository: DonationAlertWidgetRepository,
	) { }

	create = async ({ data }: { data: DonationAlertWidgetInputParams }) => {
		return this.donationAlertWidgetRepository.create({
			data: new DonationAlertWidget(data),
		});
	}

	findManyByAlertWidgetsGroupIds = async (ids: ID[]) => {
		return this.donationAlertWidgetRepository.findManyByAlertWidgetsGroupIds(ids);
	}
}