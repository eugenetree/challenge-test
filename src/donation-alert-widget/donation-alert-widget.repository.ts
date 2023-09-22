import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { DonationAlertWidget } from './donation-alert-widget';
import { Optional } from 'src/_common/types';

type DonationAlertWidgetInput = Optional<
  DonationAlertWidget,
  'id' | 'maxAmount' | 'minAmount' | 'specificAmount'
>;

@Injectable()
export class DonationAlertWidgetRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: DonationAlertWidgetInput;
  }): Promise<DonationAlertWidget> => {
    return this.prisma.donationAlertWidget.create({ data });
  };

  findMany = async ({
    where,
  }: {
    where: Partial<DonationAlertWidget>;
  }): Promise<DonationAlertWidget[]> => {
    return this.prisma.donationAlertWidget.findMany({ where });
  };

  async count({ where }: { where: Partial<DonationAlertWidget> }) {
    return this.prisma.donationAlertWidget.count({ where });
  }
}
