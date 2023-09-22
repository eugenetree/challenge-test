import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { ID } from 'src/_common/types';

@Injectable()
export class PanelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAlertWidgetsPage({ userId }: { userId: ID }) {
    return this.prisma.alertWidgetsGroup.findMany({
      where: { userId },
      include: {
        donationAlertWidgets: {
          include: {
            donationAlertWidgetTemplate: {
              include: { widgetTemplateTexts: true },
            },
          },
        },
      },
    });
  }
}
