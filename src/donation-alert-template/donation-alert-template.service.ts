import { Injectable } from '@nestjs/common';
import {
  defaultDonationAlertPositionConfigs,
  defaultDonationAlertTemplates,
} from './donation-alert-template.constants';
import { DonationAlertTemplateRepository } from './donation-alert-template.repository';
import { UiTextElementRepository } from 'src/ui-elements/ui-text-element.repository';
import { ID } from 'src/_common/types';

@Injectable()
export class DonationAlertTemplateService {
  constructor(
    private readonly donationAlertTemplateRepository: DonationAlertTemplateRepository,
    private readonly uiTextElementRepository: UiTextElementRepository,
  ) {}

  async createDefaultTemplate({
    userId,
    widgetId,
  }: {
    userId: ID;
    widgetId: ID;
  }) {
    const defaultTemplate = defaultDonationAlertTemplates['default/main'];

    const createdTemplate = await this.donationAlertTemplateRepository.create({
      data: {
        name: defaultTemplate.name,
        userId,
        donationAlertId: widgetId,
      },
    });

    const createdUiTextElements = await this.uiTextElementRepository.createMany(
      {
        data: defaultTemplate.uiTextElements.map((element) => ({
          name: element.name,
          text: element.text,
          styleConfig: element.styleConfig,
          animationConfig: element.animationConfig,
          positionConfig: element.positionConfig,
          donationAlertTemplateId: createdTemplate.id,
        })),
      },
    );

    return {
      template: createdTemplate,
      uiTextElements: createdUiTextElements,
    };
  }

  async getTemplates({ userId }: { userId: ID }) {
    const userTemplates = await this.donationAlertTemplateRepository.findMany({
      where: { userId },
      include: { uiTextElements: true },
    });

    const defaultTemplates = Object.values(defaultDonationAlertTemplates);

    return {
      userTemplates,
      defaultTemplates,
    };
  }

  async getDefaultPositionConfigs() {
    return defaultDonationAlertPositionConfigs;
  }
}
