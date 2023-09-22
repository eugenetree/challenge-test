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
    const data = await this.prisma.alertWidgetsGroup.findMany({
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

    return data.map((group) => ({
      ...group,
      donationAlertWidgets: group.donationAlertWidgets.map((widget) => ({
        ...widget,
        donationAlertWidgetTemplate: {
          ...widget.donationAlertWidgetTemplate,
          widgetTemplateTexts:
            widget.donationAlertWidgetTemplate?.widgetTemplateTexts.map(
              (text) =>
                this.widgetTemplateTextTransformer.transformFromDbToAppFormat(
                  text,
                ),
            ),
        },
      })),
    }));
  }
}
