import { Injectable } from "@nestjs/common";
import { groupBy } from "lodash";
import { SocketService } from "src/_common/socket/socket.service";
import { ID } from "src/_common/types";
import { DonationAlertWidget } from "src/donation-alert-widget/donation-alert-widget";
import { DonationAlertWidgetRepository } from "src/donation-alert-widget/donation-alert-widget.repository";
import { Donation } from "src/donation/donation";

@Injectable()
export class DonationNotifierService {
	constructor(
		private readonly socketService: SocketService,
		private readonly donationAlertWidgetRepository: DonationAlertWidgetRepository,
	) { }

	notify = async (donation: Donation) => {
		const donationWidgets = await this.donationAlertWidgetRepository.findMany({
			where: { userId: donation.recipientId },
		});

		const donationWidgetsByGroupId = groupBy(donationWidgets, 'alertWidgetsGroupId')

		for (const [alertWidgetsGroupId, donationWidgets] of Object.entries(donationWidgetsByGroupId)) {
			this.notifyAlertWidgetsGroup({
				alertWidgetsGroupId,
				donationWidgets,
				donation,
			})
		}
	}

	private notifyAlertWidgetsGroup = async ({
		alertWidgetsGroupId,
		donationWidgets,
		donation,
	}: {
		alertWidgetsGroupId: ID;
		donationWidgets: DonationAlertWidget[];
		donation: Donation;
	}) => {
		const {
			widgetsWithSpecificAmount,
			widgetsWithRangeAmount,
			widgetsWithMinAmount,
		} = this.getSortedDonationWidgetsByAmount({ donationWidgets });

		for (const widget of widgetsWithSpecificAmount) {
			if (donation.amount === widget.specificAmount) {
				this.socketService.emitEvent({
					roomId: widget.id,
					eventName: 'DONATION_TO_PLAY_REGULAR',
					eventData: donation,
				})

				return;
			}
		}

		for (const widget of widgetsWithRangeAmount) {
				if (donation.amount >= widget.minAmount! && donation.amount <= widget.maxAmount!) {
				this.socketService.emitEvent({
					roomId: widget.id,
					eventName: 'DONATION_TO_PLAY_REGULAR',
					eventData: donation,
				})

				return;
			}
		}

		for (const widget of widgetsWithMinAmount) {
			if (donation.amount >= widget.minAmount!) {
				this.socketService.emitEvent({
					roomId: widget.id,
					eventName: 'DONATION_TO_PLAY_REGULAR',
					eventData: donation,
				})

				return;
			}
		}
	}

	private getSortedDonationWidgetsByAmount = ({
		donationWidgets,
	}: {
		donationWidgets: DonationAlertWidget[],
	}) => {
		const widgetsWithSpecificAmount: DonationAlertWidget[] = [];
		const widgetsWithRangeAmount: DonationAlertWidget[] = [];
		const widgetsWithMinAmount: DonationAlertWidget[] = [];

		for (const donationWidget of donationWidgets) {
			if (typeof donationWidget.specificAmount === 'number') {
				widgetsWithSpecificAmount.push(donationWidget);
				continue;
			}

			if (typeof donationWidget.maxAmount === 'number' && typeof donationWidget.minAmount === 'number') {
				widgetsWithRangeAmount.push(donationWidget);
				continue;
			}

			widgetsWithMinAmount.push(donationWidget);
		}

		return {
			widgetsWithSpecificAmount,
			widgetsWithRangeAmount,
			widgetsWithMinAmount: widgetsWithMinAmount.sort((a, b) => b.minAmount! - a.minAmount!),
		}
	}
}