import { Injectable } from "@nestjs/common";
import { groupBy } from "lodash";
import { AlertWidgetsGroupEventName, DonationGoalWidgetEventName } from "src/_common/socket/socket.events";
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

	async notify(donation: Donation) {
		this.notifyDonationAlertWidgets(donation);
		this.notifyDonationGoalWidget(donation);
	}

	private async notifyDonationAlertWidgets(donation: Donation) {
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

	// TODO: give better naming
	private async notifyAlertWidgetsGroup({
		alertWidgetsGroupId,
		donationWidgets,
		donation,
	}: {
		alertWidgetsGroupId: ID;
		donationWidgets: DonationAlertWidget[];
		donation: Donation;
	}) {
		const {
			widgetsWithSpecificAmount,
			widgetsWithRangeAmount,
			widgetsWithMinAmount,
		} = this.getSortedDonationWidgetsByAmount({ donationWidgets });

		for (const widget of widgetsWithSpecificAmount) {
			if (donation.amount === widget.specificAmount) {
				this.socketService.emitAlertWidgetsGroupEvent({
					eventName: AlertWidgetsGroupEventName.DONATION_TO_PLAY_REGULAR,
					alertWidgetsGroupId,
					data: { donationAlertWidgetId: widget.id, donation },
				})

				return;
			}
		}

		for (const widget of widgetsWithRangeAmount) {
			if (donation.amount >= widget.minAmount! && donation.amount <= widget.maxAmount!) {
				this.socketService.emitAlertWidgetsGroupEvent({
					eventName: AlertWidgetsGroupEventName.DONATION_TO_PLAY_REGULAR,
					alertWidgetsGroupId,
					data: { donationAlertWidgetId: widget.id, donation },
				})

				return;
			}
		}

		for (const widget of widgetsWithMinAmount) {
			if (donation.amount >= widget.minAmount!) {
				this.socketService.emitAlertWidgetsGroupEvent({
					eventName: AlertWidgetsGroupEventName.DONATION_TO_PLAY_REGULAR,
					alertWidgetsGroupId,
					data: { donationAlertWidgetId: widget.id, donation },
				})

				return;
			}
		}
	}

	private getSortedDonationWidgetsByAmount({
		donationWidgets,
	}: {
		donationWidgets: DonationAlertWidget[],
	}) {
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

	private notifyDonationGoalWidget(donation: Donation) {
		console.log(`processing goal widget alert for ${JSON.stringify(donation)}`)

		if (donation.donationGoalWidgetId === null) {
			return;
		}

		this.socketService.emitDonationGoalWidgetEvent({
			eventName: DonationGoalWidgetEventName.DONATION_GOAL_WIDGET_SUM_UPDATED,
			donationGoalWidgetId: donation.donationGoalWidgetId,
			data: { sum: donation.amount },
		})
	}
}