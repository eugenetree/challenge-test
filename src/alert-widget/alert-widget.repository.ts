import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { AlertWidget } from './alert-widget';
import { Optional } from 'src/_common/types';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class AlertWidgetRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: OmitBaseModel<AlertWidget>;
  }): Promise<AlertWidget> => {
    return this.prisma.alertWidget.create({ data });
  };

  findMany = async ({
    where,
    include,
  }: {
    where: Partial<AlertWidget>;
    include?: { donationAlerts?: boolean };
  }): Promise<AlertWidget[]> => {
    return this.prisma.alertWidget.findMany({ where, include });
  };

  count = async ({
    where,
  }: {
    where: Partial<AlertWidget>;
  }): Promise<number> => {
    return this.prisma.alertWidget.count({ where });
  };
}
