import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { AlertWidgetsGroup } from './alert-widgets-group';
import { Optional } from 'src/_common/types';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class AlertWidgetsGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: OmitBaseModel<AlertWidgetsGroup>;
  }): Promise<AlertWidgetsGroup> => {
    return this.prisma.alertWidgetsGroup.create({ data });
  };

  findMany = async ({
    where,
    include,
  }: {
    where: Partial<AlertWidgetsGroup>;
    include?: { donationAlertWidgets?: boolean };
  }): Promise<AlertWidgetsGroup[]> => {
    return this.prisma.alertWidgetsGroup.findMany({ where, include });
  };

  count = async ({
    where,
  }: {
    where: Partial<AlertWidgetsGroup>;
  }): Promise<number> => {
    return this.prisma.alertWidgetsGroup.count({ where });
  };
}
