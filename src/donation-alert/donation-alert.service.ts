import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { DonationAlertRepository } from './donation-alert.repository';
import { DonationAlertTemplateService } from 'src/donation-alert-template/donation-alert-template.service';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import {
  DonationAlert,
  DonationAlertWithTemplate,
  DonationAlertWithCustomTemplateCreateInput,
  DonationAlertCreateInput,
} from './donation-alert.types';
import { DonationAlertMapper } from './donation-alert.mapper';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class DonationAlertService {
  private readonly alertDefaultFields = {
    minAmount: 1,
    duration: 10,
    isEnabled: true,
  };

  constructor(
    private readonly donationAlertRepository: DonationAlertRepository,
    private readonly donationAlertTemlateService: DonationAlertTemplateService,
    private readonly donationAlertMapper: DonationAlertMapper,
    private readonly textElementMapper: UiTextElementMapper,
  ) {}

  async createDefault(
    alert: DonationAlertCreateInput,
  ): Promise<DonationAlertWithTemplate> {
    const alertName = await this.generateAlertName({
      alertWidgetId: alert.alertWidgetId,
    });

    const createdAlert = await this.donationAlertRepository.create({
      data: {
        ...this.alertDefaultFields,
        ...alert,
        name: alertName,
      },
    });

    const createdTemplate =
      await this.donationAlertTemlateService.createDefault({
        donationAlertId: createdAlert.id,
        userId: createdAlert.userId,
      });

    return {
      ...createdAlert,
      template: createdTemplate,
    };
  }

  async createWithCustomTemplate({
    template,
    ...alert
  }: DonationAlertWithCustomTemplateCreateInput): Promise<DonationAlertWithTemplate> {
    const alertName =
      alert.name ||
      (await this.generateAlertName({ alertWidgetId: alert.alertWidgetId }));

    const createdAlert = await this.donationAlertRepository.create({
      data: {
        ...this.alertDefaultFields,
        ...alert,
        name: alertName,
      },
    });

    const createdTemplate = await this.donationAlertTemlateService.create({
      ...template,
      donationAlertId: createdAlert.id,
      userId: createdAlert.userId,
    });

    return {
      ...createdAlert,
      template: createdTemplate,
    };
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

  private async generateAlertName({
    alertWidgetId,
  }: {
    alertWidgetId: ID;
  }): Promise<string> {
    const alertsCount = await this.donationAlertRepository.count({
      where: { alertWidgetId },
    });
    return `Сповіщення № ${alertsCount + 1}`;
  }
}
