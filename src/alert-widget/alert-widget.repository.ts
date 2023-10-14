import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { AlertWidget, AlertWidgetWithNested } from './alert-widget';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { AlertWidgetMapper } from './alert-widget.mapper';

@Injectable()
export class AlertWidgetRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly alertWidgetMapper: AlertWidgetMapper,
  ) {}

  async create({
    data,
  }: {
    data: OmitBaseModel<AlertWidget>;
  }): Promise<AlertWidget> {
    return await this.prisma.alertWidget.create({ data });
  }

  async findMany({
    where,
  }: {
    where: Partial<AlertWidget>;
  }): Promise<AlertWidget[]> {
    return this.prisma.alertWidget.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });
  }

  async findManyWithNested({
    where,
  }: {
    where: Partial<AlertWidget>;
    include?: { donationAlerts?: boolean };
  }): Promise<AlertWidgetWithNested[]> {
    const data = await this.prisma.alertWidget.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      include: {
        donationAlerts: {
          where: { template: { isNot: null } },
          orderBy: { createdAt: 'asc' },
          include: {
            template: true,
          },
        },
      },
    });

    return data.map((alertWidget) => {
      return this.alertWidgetMapper.fromDbToAppWithNested(alertWidget);
    });
  }

  async count({ where }: { where: Partial<AlertWidget> }): Promise<number> {
    return this.prisma.alertWidget.count({ where });
  }
}
