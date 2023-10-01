import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlertWidgetWithRelations } from './alert-widget';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import { omit } from 'lodash';

const prismaRequest = Prisma.validator<Prisma.AlertWidgetArgs>()({
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

type PrismaAlertWidgetWithRelations = Prisma.AlertWidgetGetPayload<
  typeof prismaRequest
>;

// TODO: better move '!' moment to be handled in repository
// do type overriding in repository and then send widgets to mapper
@Injectable()
export class AlertWidgetMapper {
  constructor(private readonly uiTextElementMapper: UiTextElementMapper) {}

  fromDbToApp(
    alertWidget: PrismaAlertWidgetWithRelations,
  ): AlertWidgetWithRelations {
    return {
      ...alertWidget,
      donationAlerts: alertWidget.donationAlerts.map((donationAlert) => {
        const { donationAlertTemplate } = donationAlert;
        const { uiTextElements } = donationAlertTemplate!;

        return {
          ...omit(donationAlert, 'donationAlertTemplate'),
          template: {
            ...omit(donationAlertTemplate, 'uiTextElements'),
            uiTextElements: uiTextElements.map((uiTextElement) =>
              this.uiTextElementMapper.fromDbToApp(uiTextElement),
            ),
          },
        };
      }),
    };
  }
}
