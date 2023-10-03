import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { DonationAlertRepository } from './donation-alert.repository';
import { DonationAlertTemplateService } from 'src/donation-alert-template/donation-alert-template.service';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import { DonationAlert, DonationAlertWithTemplate } from './donation-alert';
import { DonationAlertMapper } from './donation-alert.mapper';

@Injectable()
export class DonationAlertService {
  constructor(
    private readonly donationAlertRepository: DonationAlertRepository,
    private readonly donationAlertTemlateService: DonationAlertTemplateService,
    private readonly donationAlertMapper: DonationAlertMapper,
    private readonly textElementMapper: UiTextElementMapper,
  ) {}

  async create({
    name,
    userId,
    alertWidgetId,
  }: {
    name?: string;
    userId: ID;
    alertWidgetId: ID;
  }): Promise<DonationAlert> {
    let preparedName = name;

    if (!name) {
      const widgetsInGroupCount = await this.donationAlertRepository.count({
        where: { userId, alertWidgetId },
      });

      preparedName = `Сповіщення № ${widgetsInGroupCount + 1}`;
    } else {
      preparedName = 'Сповіщення № 1';
    }

    const createdAlert = await this.donationAlertRepository.create({
      data: {
        name: preparedName,
        minAmount: 1,
        isEnabled: true,
        duration: 10,
        userId,
        alertWidgetId,
      },
    });

    await this.donationAlertTemlateService.createDefaultTemplate({
      userId,
      donationAlertId: createdAlert.id,
    });

    return createdAlert;
  }

  async findOne({
    userId,
    alertId,
    alertWidgetId,
  }: {
    userId: ID;
    alertId: ID;
    alertWidgetId: ID;
    includeRelations?: boolean;
  }): Promise<DonationAlert | null> {
    return this.donationAlertRepository.findOne({
      where: {
        id: alertId,
        alertWidgetId,
        userId,
      },
    });
  }

  async findOneWithTemplate({
    userId,
    alertId,
    alertWidgetId,
  }: {
    userId: ID;
    alertId: ID;
    alertWidgetId: ID;
  }): Promise<DonationAlertWithTemplate | null> {
    return this.donationAlertRepository.findOneWithTemplate({
      where: {
        id: alertId,
        alertWidgetId,
        userId,
      },
    });
  }
}
