import { Injectable } from '@nestjs/common';
import {
  defaultDonationAlertPositionConfigs,
  defaultDonationAlertTemplates,
} from './donation-alert-template.constants';
import { DonationAlertTemplateRepository } from './donation-alert-template.repository';
import { UiTextElementRepository } from 'src/ui-elements/ui-text-element.repository';
import { ID } from 'src/_common/types';
import {
  DonationAlertTemplate,
  DonationAlertTemplateWithDonationAlert,
} from './donation-alert-template.types';

@Injectable()
export class DonationAlertTemplateService {
  constructor(
    private readonly donationAlertTemplateRepository: DonationAlertTemplateRepository,
    private readonly uiTextElementRepository: UiTextElementRepository,
  ) {}

  async createDefaultTemplate({
    userId,
    donationAlertId,
  }: {
    userId: ID;
    donationAlertId: ID;
  }) {
    const defaultTemplate = defaultDonationAlertTemplates['default/main'];

    const createdTemplate = await this.donationAlertTemplateRepository.create({
      data: {
        name: defaultTemplate.name,
        userId,
        donationAlertId,
        elements: defaultTemplate.elements,
      },
    });

    return createdTemplate;
  }

  async findMany({ userId }: { userId: ID }): Promise<DonationAlertTemplate[]> {
    return this.donationAlertTemplateRepository.findMany({ where: { userId } });
  }

  async findManyWithDonationAlert({
    userId,
  }: {
    userId: ID;
  }): Promise<DonationAlertTemplateWithDonationAlert[]> {
    return this.donationAlertTemplateRepository.findManyWithDonationAlert({
      where: { userId },
    });
  }

  async getDefaultTemplates(): Promise<DonationAlertTemplate[]> {
    const defaultTemplates = Object.values(defaultDonationAlertTemplates);
    return defaultTemplates;
  }

  async getDefaultPositionConfigs() {
    return defaultDonationAlertPositionConfigs;
  }
}
