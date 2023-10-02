import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { DonationAlert, DonationAlertWithRelations } from './donation-alert';
import { Optional } from 'src/_common/types';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { Donation } from 'src/donation/donation';
import { DonationAlertMapper } from './donation-alert.mapper';

type DonationAlertInput = OmitBaseModel<
  DonationAlert,
  'maxAmount' | 'minAmount' | 'specificAmount'
>;

@Injectable()
export class DonationAlertRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly donationAlertMapper: DonationAlertMapper,
  ) {}

  create = async ({
    data,
  }: {
    data: DonationAlertInput;
  }): Promise<DonationAlert> => {
    return this.prisma.donationAlert.create({ data });
  };

  findOne({ where }: { where: Partial<DonationAlert> }) {
    return this.prisma.donationAlert.findFirst({
      where: { ...where, donationAlertTemplate: { isNot: null } },
    });
  }

  findOneWithRelations({
    where,
  }: {
    where: Partial<DonationAlertWithRelations>;
  }) {
    return this.prisma.donationAlert.findFirst({
      where: { ...where, donationAlertTemplate: { isNot: null } },
      include: { donationAlertTemplate: { include: { uiTextElements: true } } },
    });
  }

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
