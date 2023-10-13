import { Injectable } from '@nestjs/common';
import {
  defaultDonationAlertPositionConfigs,
  defaultDonationAlertTemplates as globalDonationAlertTemplates,
} from './donation-alert-template.constants';
import { DonationAlertTemplateRepository } from './donation-alert-template.repository';
import { UiTextElementRepository } from 'src/ui-elements/ui-text-element.repository';
import { ID } from 'src/_common/types';
import {
  DonationAlertTemplate,
  DonationAlertTemplateCreateInput,
  DonationAlertTemplateWithDonationAlert,
} from './donation-alert-template.types';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class DonationAlertTemplateService {
  constructor(
    private readonly donationAlertTemplateRepository: DonationAlertTemplateRepository,
    private readonly uiTextElementRepository: UiTextElementRepository,
  ) {}

  async create({
    name,
    elements,
    userId,
    donationAlertId,
  }: DonationAlertTemplateCreateInput) {
    return await this.donationAlertTemplateRepository.create({
      data: {
        name: name || this.getDefaultTemplate().name,
        elements,
        userId,
        donationAlertId,
      },
    });
  }

  async createDefault({
    userId,
    donationAlertId,
  }: {
    userId: ID;
    donationAlertId: ID;
  }) {
    const defaultTemplate = this.getDefaultTemplate();

    return await this.donationAlertTemplateRepository.create({
      data: {
        name: defaultTemplate.name,
        userId,
        donationAlertId,
        elements: defaultTemplate.elements,
      },
    });
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

  async getGlobalTemplates(): Promise<DonationAlertTemplate[]> {
    const globalTemplates = Object.values(globalDonationAlertTemplates);
    return globalTemplates;
  }

  async getDefaultPositionConfigs() {
    return defaultDonationAlertPositionConfigs;
  }

  private getDefaultTemplate() {
    return globalDonationAlertTemplates['default'];
  }
}
