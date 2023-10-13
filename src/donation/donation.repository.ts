import { Injectable } from '@nestjs/common';
import { Donation as DonationDbEntity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_common/database/prisma.service';
import { Donation } from './donation';
import { ID } from 'src/_common/types';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class DonationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: OmitBaseModel<
      Donation,
      'id' | 'donationGoalWidgetId' | 'paymentData'
    >;
  }): Promise<Donation> => {
    const createdDonation = await this.prisma.donation.create({
      data: {
        ...data,
        paymentData: data.paymentData ? JSON.stringify(data.paymentData) : null,
      },
    });

    return this.fromDbEntityToModel(createdDonation);
  };

  findOne = async ({
    where,
  }: {
    where: Partial<Donation>;
  }): Promise<Donation | null> => {
    const foundDonation = await this.prisma.donation.findFirst({ where });
    return foundDonation ? this.fromDbEntityToModel(foundDonation) : null;
  };

  updateOne = async (
    id: ID,
    { data }: { data: Partial<Omit<Donation, 'id'>> },
  ) => {
    const updatedDonation = await this.prisma.donation.update({
      data: {
        ...data,
        paymentData: data.paymentData
          ? JSON.stringify(data.paymentData)
          : undefined,
      },
      where: { id },
    });

    return this.fromDbEntityToModel(updatedDonation);
  };

  private fromDbEntityToModel = (entity: DonationDbEntity) => {
    return {
      ...entity,
      paymentData: entity.paymentData ? JSON.parse(entity.paymentData) : null,
    };
  };
}
