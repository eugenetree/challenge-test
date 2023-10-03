import { Injectable } from '@nestjs/common';
import {
  DonationAlertTemplate,
  DonationAlertTemplateWithDonationAlert,
  DonationAlertTemplateWithNested,
} from './donation-alert-template.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import {
  UiTextElement as PrismaUiTextElement,
  DonationAlertTemplate as PrismaDonationAlertTemplate,
} from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { Optional } from 'src/_common/types';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';

@Injectable()
export class DonationAlertTemplateRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uiTextElementTransformer: UiTextElementMapper,
  ) {}

  async create({ data }: { data: OmitBaseModel<DonationAlertTemplate> }) {
    return this.prisma.donationAlertTemplate.create({
      data,
    });
  }

  async findOne({ where }: { where: Partial<DonationAlertTemplate> }) {
    return this.prisma.donationAlertTemplate.findFirst({ where });
  }

  async findMany({
    where,
  }: {
    where: Partial<DonationAlertTemplate>;
  }): Promise<DonationAlertTemplate[]> {
    return this.prisma.donationAlertTemplate.findMany({
      where,
    });
  }

  async findManyWithDonationAlert({
    where,
  }: {
    where: Partial<DonationAlertTemplate>;
  }): Promise<DonationAlertTemplateWithDonationAlert[]> {
    return this.prisma.donationAlertTemplate.findMany({
      where,
      include: {
        donationAlert: true,
      },
    });
  }

  async findManyWithNested({
    where,
  }: {
    where: Partial<DonationAlertTemplate>;
  }): Promise<DonationAlertTemplateWithNested[]> {
    const data = await this.prisma.donationAlertTemplate.findMany({
      where,
      include: {
        uiTextElements: true,
      },
    });

    return data.map((template) => ({
      ...template,
      uiTextElements: template.uiTextElements.map((templateText) =>
        this.uiTextElementTransformer.fromDbToApp(templateText),
      ),
    }));
  }
}
