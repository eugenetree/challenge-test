import { Injectable } from '@nestjs/common';
import { groupBy } from 'lodash';
import {
  AlertWidgetEventName,
  DonationGoalWidgetEventName,
} from 'src/_common/socket/socket.events';
import { SocketService } from 'src/_common/socket/socket.service';
import { ID } from 'src/_common/types';
import { DonationAlert } from 'src/donation-alert/donation-alert.type';
import { DonationAlertRepository } from 'src/donation-alert/donation-alert.repository';
import { Donation } from 'src/donation/donation';

@Injectable()
export class DonationNotifierService {
  constructor(
    private readonly socketService: SocketService,
    private readonly donationAlertRepository: DonationAlertRepository,
  ) {}

  async notify(donation: Donation) {
    this.notifyAlertWidgets(donation);
    this.notifyDonationGoalWidget(donation);
  }

  private async notifyAlertWidgets(donation: Donation) {
    const donationWidgets = await this.donationAlertRepository.findMany({
      where: { userId: donation.recipientId },
    });

    const donationWidgetsByGroupId = groupBy(donationWidgets, 'alertWidgetId');

    for (const [alertWidgetId, donationWidgets] of Object.entries(
      donationWidgetsByGroupId,
    )) {
      this.notifyAlertWidgetsGroup({
        alertWidgetId,
        donationWidgets,
        donation,
      });
    }
  }

  // TODO: give better naming
  private async notifyAlertWidgetsGroup({
    alertWidgetId,
    donationWidgets,
    donation,
  }: {
    alertWidgetId: ID;
    donationWidgets: DonationAlert[];
    donation: Donation;
  }) {
    const {
      widgetsWithSpecificAmount,
      widgetsWithRangeAmount,
      widgetsWithMinAmount,
    } = this.getSortedDonationWidgetsByAmount({ donationWidgets });

    for (const widget of widgetsWithSpecificAmount) {
      if (donation.amount === widget.specificAmount) {
        this.socketService.emitAlertWidgetEvent({
          eventName: AlertWidgetEventName.DONATION_ALERT_TO_PLAY_REGULAR,
          alertWidgetId,
          data: { donationAlert: widget.id, donation },
        });

        return;
      }
    }

    for (const widget of widgetsWithRangeAmount) {
      if (
        donation.amount >= widget.minAmount! &&
        donation.amount <= widget.maxAmount!
      ) {
        this.socketService.emitAlertWidgetEvent({
          eventName: AlertWidgetEventName.DONATION_ALERT_TO_PLAY_REGULAR,
          alertWidgetId,
          data: { donationAlert: widget.id, donation },
        });

        return;
      }
    }

    for (const widget of widgetsWithMinAmount) {
      if (donation.amount >= widget.minAmount!) {
        this.socketService.emitAlertWidgetEvent({
          eventName: AlertWidgetEventName.DONATION_ALERT_TO_PLAY_REGULAR,
          alertWidgetId,
          data: { donationAlert: widget.id, donation },
        });

        return;
      }
    }
  }

  private getSortedDonationWidgetsByAmount({
    donationWidgets,
  }: {
    donationWidgets: DonationAlert[];
  }) {
    const widgetsWithSpecificAmount: DonationAlert[] = [];
    const widgetsWithRangeAmount: DonationAlert[] = [];
    const widgetsWithMinAmount: DonationAlert[] = [];

    for (const donationWidget of donationWidgets) {
      if (typeof donationWidget.specificAmount === 'number') {
        widgetsWithSpecificAmount.push(donationWidget);
        continue;
      }

      if (
        typeof donationWidget.maxAmount === 'number' &&
        typeof donationWidget.minAmount === 'number'
      ) {
        widgetsWithRangeAmount.push(donationWidget);
        continue;
      }

      widgetsWithMinAmount.push(donationWidget);
    }

    return {
      widgetsWithSpecificAmount,
      widgetsWithRangeAmount,
      widgetsWithMinAmount: widgetsWithMinAmount.sort(
        (a, b) => b.minAmount! - a.minAmount!,
      ),
    };
  }

  private notifyDonationGoalWidget(donation: Donation) {
    console.log(`processing goal widget alert for ${JSON.stringify(donation)}`);

    if (donation.donationGoalWidgetId === null) {
      return;
    }

    this.socketService.emitDonationGoalWidgetEvent({
      eventName: DonationGoalWidgetEventName.DONATION_GOAL_SUM_UPDATED,
      donationGoalWidgetId: donation.donationGoalWidgetId,
      data: { sum: donation.amount },
    });
  }
}
