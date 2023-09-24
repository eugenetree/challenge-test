import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { ID } from 'src/_common/types';
import { WidgetTemplateTextTransformer } from 'src/widget/widget-template-text/widget-template-text.transformer';

@Injectable()
export class PanelRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly widgetTemplateTextTransformer: WidgetTemplateTextTransformer,
  ) {}

  async getAlertsPage({ userId }: { userId: ID }) {
    const data = await this.prisma.alertWidget.findMany({
      where: { userId },
      include: {
        donationAlerts: {
          include: {
            donationAlertTemplate: {
              include: { widgetTemplateTexts: true },
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
            widgetTemplateTexts:
              widget.donationAlertTemplate?.widgetTemplateTexts.map((text) =>
                this.widgetTemplateTextTransformer.transformFromDbToAppFormat(
                  text,
                ),
              ),
          },
        };
      }),
    }));
  }
}
