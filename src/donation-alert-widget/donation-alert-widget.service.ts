import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { DonationAlertWidgetRepository } from './donation-alert-widget.repository';
import { DonationAlertWidgetTemplateService } from 'src/donation-alert-widget-template/donation-alert-widget-template.service';

@Injectable()
export class DonationAlertWidgetService {
  constructor(
    private readonly donationAlertWidgetRepository: DonationAlertWidgetRepository,
    private readonly donationAlertWidgetTemlateService: DonationAlertWidgetTemplateService,
  ) {}

  async create({
    name,
    userId,
    alertWidgetsGroupId,
  }: {
    name?: string;
    userId: ID;
    alertWidgetsGroupId: ID;
  }) {
    let preparedName = name;

    if (!name) {
      const widgetsInGroupCount =
        await this.donationAlertWidgetRepository.count({
          where: { userId, alertWidgetsGroupId },
        });

      preparedName = `Віджет № ${widgetsInGroupCount + 1}`;
    } else {
      preparedName = 'Віджет № 1';
    }

    const createdWidget = await this.donationAlertWidgetRepository.create({
      data: {
        name: preparedName,
        minAmount: 1,
        userId,
        alertWidgetsGroupId,
      },
    });

    const { template, widgetTemplateTexts } =
      await this.donationAlertWidgetTemlateService.createDefaultTemplate({
        userId,
        widgetId: createdWidget.id,
      });

    return {
      ...createdWidget,
      template: {
        ...template,
        widgetTemplateTexts,
      },
    };
  }
}
