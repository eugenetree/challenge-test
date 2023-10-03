import { Injectable } from '@nestjs/common';
import {
  DonationAlertTemplate,
  DonationAlertTemplateWithDonationAlert,
} from './donation-alert-template.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import {
  UiTextElement as PrismaUiTextElement,
  DonationAlertTemplate as PrismaDonationAlertTemplate,
} from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { Optional } from 'src/_common/types';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import { DonationAlertTemplateMapper } from './donation-alert-template.mapper';

@Injectable()
export class DonationAlertTemplateRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly donaitonAlertTemplateMapper: DonationAlertTemplateMapper,
  ) {}

  async create({
    data,
  }: {
    data: OmitBaseModel<DonationAlertTemplate>;
  }): Promise<DonationAlertTemplate> {
    const template = await this.prisma.donationAlertTemplate.create({
      data: {
        ...data,
        elements: JSON.stringify(data.elements),
      },
    });

    return this.donaitonAlertTemplateMapper.fromDbToApp(template);
  }

  async findOne({
    where,
  }: {
    where: Partial<Omit<DonationAlertTemplate, 'elements'>>;
  }): Promise<DonationAlertTemplate | null> {
    const template = await this.prisma.donationAlertTemplate.findFirst({
      where,
    });

    if (!template) {
      return null;
    }

    return this.donaitonAlertTemplateMapper.fromDbToApp(template);
  }

  async findMany({
    where,
  }: {
    where: Partial<Omit<DonationAlertTemplate, 'elements'>>;
  }): Promise<DonationAlertTemplate[]> {
    const templates = await this.prisma.donationAlertTemplate.findMany({
      where,
    });

    return templates.map((template) => {
      return this.donaitonAlertTemplateMapper.fromDbToApp(template);
    });
  }

  async findManyWithDonationAlert({
    where,
  }: {
    where: Partial<Omit<DonationAlertTemplate, 'elements'>>;
  }): Promise<DonationAlertTemplateWithDonationAlert[]> {
    const templates = await this.prisma.donationAlertTemplate.findMany({
      where,
      include: {
        donationAlert: true,
      },
    });

    return templates.map((template) => {
      return this.donaitonAlertTemplateMapper.fromDbToApp(template);
    });
  }
}
