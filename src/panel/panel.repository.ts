import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { ID } from 'src/_common/types';
import { UiTextElementTransformer } from 'src/ui-elements/ui-text-element.transformer';

@Injectable()
export class PanelRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uiTextElementTransformer: UiTextElementTransformer,
  ) {}

  async getAlertsPage({ userId }: { userId: ID }) {
    const data = await this.prisma.alertWidget.findMany({
      where: { userId },
      include: {
        donationAlerts: {
          include: {
            donationAlertTemplate: {
              include: { uiTextElements: true },
            },
          },
        },
      },
    });

    return data.map((group) => ({
      ...group,
      donationAlerts: group.donationAlerts.map((widget) => {
        if (!widget.donationAlertTemplate) return widget;

        return {
          ...widget,
          donationAlertTemplate: {
            ...widget.donationAlertTemplate,
            uiTextElements: widget.donationAlertTemplate?.uiTextElements.map(
              (text) =>
                this.uiTextElementTransformer.transformFromDbToAppFormat(text),
            ),
          },
        };
      }),
    }));
  }
}
