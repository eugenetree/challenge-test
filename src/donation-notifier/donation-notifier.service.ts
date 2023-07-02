import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { AlertWidgetsGroupService } from "src/alert-widgets-group/alert-widgets-group.service";
import { DonationAlertWidgetService } from "src/donation-alert-widget/donation-alert-widget.service";
import { DonationService } from "src/donation/donation.service";

@Injectable()
export class DonationNotifierService {
	constructor(
		private readonly donationService: DonationService,
		private readonly donationAlertWidgetService: DonationAlertWidgetService,
		private readonly alertWidgetsGroupService: AlertWidgetsGroupService,
		private readonly prisma: PrismaService,
	) { }

	notify = async (donationId) => {
		const donation = await this.donationService.findOne({ where: { id: donationId } });

		// rework to simply fetching all widgets maybe

		if (!donation) {
			throw new Error(`Donation with id ${donationId} not found`);
		};

		const alertWidgetGroups = await this.alertWidgetsGroupService.findMany({
			where: { userId: donation?.recipientId }
		});

		const donationAlertWidgets = await this.donationAlertWidgetService.findManyByAlertWidgetsGroupIds(
			alertWidgetGroups.map(group => group.id)
		);

		return donationAlertWidgets;
	}
}