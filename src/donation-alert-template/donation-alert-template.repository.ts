import { Injectable } from '@nestjs/common';
import { DonationAlertTemplate } from './donation-alert-template.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import {
  WidgetTemplateText as PrismaWidgetTemplateText,
  DonationAlertTemplate as PrismaDonationAlertTemplate,
} from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { Optional } from 'src/_common/types';
import { WidgetTemplateTextTransformer } from 'src/widget/widget-template-text/widget-template-text.transformer';

@Injectable()
export class DonationAlertTemplateRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly widgetTemplateTextTransformer: WidgetTemplateTextTransformer,
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
    include?: { widgetTemplateTexts?: boolean };
  }) {
    const data = await this.prisma.donationAlertTemplate.findMany({
      where,
      include,
    });

    if (include?.widgetTemplateTexts !== true) return data;

    return (
      data as (PrismaDonationAlertTemplate & {
        widgetTemplateTexts: PrismaWidgetTemplateText[];
      })[]
    ).map((template) => ({
      ...template,
      widgetTemplateTexts: template.widgetTemplateTexts.map((templateText) =>
        this.widgetTemplateTextTransformer.transformFromDbToAppFormat(
          templateText,
        ),
      ),
    }));
  }
}
