import { Injectable } from '@nestjs/common';
import { DonationAlertWidgetTemplate } from './donation-alert-widget-template.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import {
  WidgetTemplateText as PrismaWidgetTemplateText,
  DonationAlertWidgetTemplate as PrismaDonationAlertWidgetTemplate,
} from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { Optional } from 'src/_common/types';
import { WidgetTemplateTextTransformer } from 'src/widget/widget-template-text/widget-template-text.transformer';

@Injectable()
export class DonationAlertWidgetTemplateRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly widgetTemplateTextTransformer: WidgetTemplateTextTransformer,
  ) {}

  async create({ data }: { data: OmitBaseModel<DonationAlertWidgetTemplate> }) {
    return this.prisma.donationAlertWidgetTemplate.create({
      data,
    });
  }

  async findOne({ where }: { where: Partial<DonationAlertWidgetTemplate> }) {
    return this.prisma.donationAlertWidgetTemplate.findFirst({ where });
  }

  async findMany({
    where,
    include,
  }: {
    where: Partial<DonationAlertWidgetTemplate>;
    include?: { widgetTemplateTexts?: boolean };
  }) {
    const data = await this.prisma.donationAlertWidgetTemplate.findMany({
      where,
      include,
    });

    if (include?.widgetTemplateTexts !== true) return data;

    return (
      data as (PrismaDonationAlertWidgetTemplate & {
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
