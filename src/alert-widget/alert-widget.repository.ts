import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { AlertWidget, AlertWidgetWithRelations } from './alert-widget';
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
  }): Promise<AlertWidgetWithRelations> {
    console.log(`calling with ${JSON.stringify(data)}`);
    const createdWidget = await this.prisma.alertWidget.create({ data });
    return {
      ...createdWidget,
      donationAlerts: [],
    };
  }

  async findMany({
    where,
    include,
  }: {
    where: Partial<AlertWidget>;
    include?: { donationAlerts?: boolean };
  }): Promise<AlertWidgetWithRelations[]> {
    const data = await this.prisma.alertWidget.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      include: {
        donationAlerts: {
          where: { donationAlertTemplate: { isNot: null } },
          orderBy: { createdAt: 'asc' },
          include: {
            donationAlertTemplate: {
              include: { uiTextElements: true },
            },
          },
        },
      },
    });

    return data.map((alertWidget) => {
      return this.alertWidgetMapper.fromDbToApp(alertWidget);
    });
  }

  async count({ where }: { where: Partial<AlertWidget> }): Promise<number> {
    return this.prisma.alertWidget.count({ where });
  }
}
