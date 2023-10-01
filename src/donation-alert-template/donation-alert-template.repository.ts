import { Injectable } from '@nestjs/common';
import { DonationAlertTemplate } from './donation-alert-template.types';
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
    include,
  }: {
    where: Partial<DonationAlertTemplate>;
    include?: { uiTextElements?: boolean };
  }) {
    const data = await this.prisma.donationAlertTemplate.findMany({
      where,
      include,
    });

    if (include?.uiTextElements !== true) return data;

    return (
      data as (PrismaDonationAlertTemplate & {
        uiTextElements: PrismaUiTextElement[];
      })[]
    ).map((template) => ({
      ...template,
      uiTextElements: template.uiTextElements.map((templateText) =>
        this.uiTextElementTransformer.fromDbToApp(templateText),
      ),
    }));
  }
}
