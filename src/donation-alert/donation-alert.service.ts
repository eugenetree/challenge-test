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
    alertWidgetId,
  }: {
    name?: string;
    userId: ID;
    alertWidgetId: ID;
  }) {
    let preparedName = name;

    if (!name) {
      const widgetsInGroupCount = await this.donationAlertRepository.count({
        where: { userId, alertWidgetId },
      });

      preparedName = `Сповіщення № ${widgetsInGroupCount + 1}`;
    } else {
      preparedName = 'Сповіщення № 1';
    }

    const createdWidget = await this.donationAlertRepository.create({
      data: {
        name: preparedName,
        minAmount: 1,
        userId,
        alertWidgetId,
      },
    });

    const { template, uiTextElements } =
      await this.donationAlertTemlateService.createDefaultTemplate({
        userId,
        widgetId: createdWidget.id,
      });

    return {
      ...createdWidget,
      template: {
        ...template,
        uiTextElements,
      },
    };
  }
}
