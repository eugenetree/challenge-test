import { Injectable } from '@nestjs/common';
import { DonationAlertWidgetTemplate } from './donation-alert-widget-template.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import { WidgetTemplateText as PrismaWidgetTemplateText } from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { Optional } from 'src/_common/types';

@Injectable()
export class DonationAlertWidgetTemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ data }: { data: OmitBaseModel<DonationAlertWidgetTemplate> }) {
    return this.prisma.donationAlertWidgetTemplate.create({
      data,
    });
  }

  async findOne({ where }: { where: Partial<DonationAlertWidgetTemplate> }) {
    return this.prisma.donationAlertWidgetTemplate.findFirst({ where });
  }
}
