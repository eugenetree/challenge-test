import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { DonationAlertRepository } from './donation-alert.repository';
import { DonationAlertTemplateService } from 'src/donation-alert-template/donation-alert-template.service';

@Injectable()
export class DonationAlertService {
  constructor(
    private readonly donationAlertRepository: DonationAlertRepository,
    private readonly donationAlertTemlateService: DonationAlertTemplateService,
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
      const widgetsInGroupCount = await this.donationAlertRepository.count({
        where: { userId, alertWidgetId: alertWidgetsGroupId },
      });

      preparedName = `Варіація № ${widgetsInGroupCount + 1}`;
    } else {
      preparedName = 'Варіація № 1';
    }

    const createdWidget = await this.donationAlertRepository.create({
      data: {
        name: preparedName,
        minAmount: 1,
        userId,
        alertWidgetId: alertWidgetsGroupId,
      },
    });

    const { template, widgetTemplateTexts } =
      await this.donationAlertTemlateService.createDefaultTemplate({
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
