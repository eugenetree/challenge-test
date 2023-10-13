import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { DonationGoalWidget } from './donation-goal-widget';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class DonationAlertRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: OmitBaseModel<DonationGoalWidget>;
  }): Promise<DonationGoalWidget> => {
    return this.prisma.donationGoalWidget.create({ data });
  };

  findMany = async ({
    where,
  }: {
    where: Partial<DonationGoalWidget>;
  }): Promise<DonationGoalWidget[]> => {
    return this.prisma.donationGoalWidget.findMany({ where });
  };
}
