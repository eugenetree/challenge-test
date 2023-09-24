import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { DonationAlert } from './donation-alert';
import { Optional } from 'src/_common/types';

type DonationAlertInput = Optional<
  DonationAlert,
  'id' | 'maxAmount' | 'minAmount' | 'specificAmount'
>;

@Injectable()
export class DonationAlertRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: DonationAlertInput;
  }): Promise<DonationAlert> => {
    return this.prisma.donationAlert.create({ data });
  };

  findMany = async ({
    where,
  }: {
    where: Partial<DonationAlert>;
  }): Promise<DonationAlert[]> => {
    return this.prisma.donationAlert.findMany({ where });
  };

  async count({ where }: { where: Partial<DonationAlert> }) {
    return this.prisma.donationAlert.count({ where });
  }
}
