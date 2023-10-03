import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlertWidgetWithNested } from './alert-widget';
import { DonationAlertMapper } from 'src/donation-alert/donation-alert.mapper';

const prismaRequest = Prisma.validator<Prisma.AlertWidgetArgs>()({
  include: {
    donationAlerts: {
      include: {
        template: true,
      },
    },
  },
});

type PrismaAlertWidgetWithNested = Prisma.AlertWidgetGetPayload<
  typeof prismaRequest
>;

// TODO: better move '!' moment to be handled in repository
// do type overriding in repository and then send widgets to mapper
@Injectable()
export class AlertWidgetMapper {
  constructor(private readonly donationAlertMapper: DonationAlertMapper) {}

  fromDbToAppWithNested(
    widget: PrismaAlertWidgetWithNested,
  ): AlertWidgetWithNested {
    return {
      ...widget,
      donationAlerts: widget.donationAlerts.map((donationAlert) =>
        this.donationAlertMapper.fromDbToAppWithTemplate(donationAlert),
      ),
    };
  }
}
