import { Injectable } from '@nestjs/common';
import { DonationAlert as PrismaDonationAlert, Prisma } from '@prisma/client';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import { omit } from 'lodash';
import { DonationAlertWithRelations, DonationAlert } from './donation-alert';

const prismaRequest = Prisma.validator<Prisma.DonationAlertArgs>()({
  include: {
    donationAlertTemplate: {
      include: { uiTextElements: true },
    },
  },
});

type PrismaDonationAlertWithRelations = Prisma.DonationAlertGetPayload<
  typeof prismaRequest
>;

// TODO: better move '!' moment to be handled in repository
// do type overriding in repository and then send widgets to mapper
@Injectable()
export class DonationAlertMapper {
  constructor(private readonly uiTextElementMapper: UiTextElementMapper) {}
  fromDbToAppWithRelations(
    donationAlert: PrismaDonationAlertWithRelations,
  ): DonationAlertWithRelations {
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
  }
}
