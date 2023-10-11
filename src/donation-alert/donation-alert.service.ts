import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { DonationAlertRepository } from './donation-alert.repository';
import { DonationAlertTemplateService } from 'src/donation-alert-template/donation-alert-template.service';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import {
  DonationAlert,
  DonationAlertWithTemplate,
  DonationAlertWithTemplateCreateInput,
} from './donation-alert.types';
import { DonationAlertMapper } from './donation-alert.mapper';
import { CreateDonationAlertDto } from './donation-alert.dto';
import { DonationAlertTemplate } from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { DonationAlertTemplateCreateInput } from 'src/donation-alert-template/donation-alert-template.types';

@Injectable()
export class DonationAlertService {
  constructor(
    private readonly donationAlertRepository: DonationAlertRepository,
    private readonly donationAlertTemlateService: DonationAlertTemplateService,
    private readonly donationAlertMapper: DonationAlertMapper,
    private readonly textElementMapper: UiTextElementMapper,
  ) {}

  async createWithTemplate({
    template,
    ...alert
  }: DonationAlertWithTemplateCreateInput): Promise<DonationAlertWithTemplate> {
    const alertName =
      alert.name ||
      (await this.generateAlertName({ alertWidgetId: alert.alertWidgetId }));

    const createdAlert = await this.donationAlertRepository.create({
      data: {
        ...alert,
        name: alertName,
      },
    });

    const createdTemplate = await this.donationAlertTemlateService.create({
      ...template,
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
