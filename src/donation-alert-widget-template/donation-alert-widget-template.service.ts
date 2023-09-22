import { Injectable } from '@nestjs/common';
import {
  defaultDonationAlertWidgetPositionConfigs,
  defaultDonationAlertWidgetTemplates,
} from './donation-alert-widget-template.constants';
import { DonationAlertWidgetTemplateRepository } from './donation-alert-widget-template.repository';
import { WidgetTemplateTextRepository } from 'src/widget/widget-template-text/widget-template-text.repository';
import { ID } from 'src/_common/types';
import {
  DonationAlertWidgetTemplate,
  DonationAlertWidgetTemplateWithElements,
} from './donation-alert-widget-template.types';

@Injectable()
export class DonationAlertWidgetTemplateService {
  constructor(
    private readonly donationAlertWidgetTemplateRepository: DonationAlertWidgetTemplateRepository,
    private readonly widgetTemplateTextRepository: WidgetTemplateTextRepository,
  ) {}

  async createDefaultTemplate({
    userId,
    widgetId,
  }: {
    userId: ID;
    widgetId: ID;
  }) {
    const defaultTemplate = defaultDonationAlertWidgetTemplates['default/main'];

    const createdTemplate =
      await this.donationAlertWidgetTemplateRepository.create({
        data: {
          name: defaultTemplate.name,
          userId,
          donationAlertWidgetId: widgetId,
        },
      });

    const createdTextElements =
      await this.widgetTemplateTextRepository.createMany({
        data: defaultTemplate.textElements.map((element) => ({
          name: element.name,
          text: element.text,
          styleConfig: element.styleConfig,
          animationConfig: element.animationConfig,
          positionConfig: element.positionConfig,
          donationAlertWidgetTemplateId: createdTemplate.id,
        })),
      });

    return {
      template: createdTemplate,
      textElements: createdTextElements,
    };
  }

  async getDefaultTemplates(): Promise<
    DonationAlertWidgetTemplateWithElements[]
  > {
    return Object.values(defaultDonationAlertWidgetTemplates);
  }

  async getDefaultPositionConfigs() {
    return defaultDonationAlertWidgetPositionConfigs;
  }
}
