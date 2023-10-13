import { Injectable } from '@nestjs/common';
import { DonationAlert as PrismaDonationAlert, Prisma } from '@prisma/client';
import { DonationAlertWithTemplate } from './donation-alert.types';
import { DonationAlertTemplateMapper } from 'src/donation-alert-template/donation-alert-template.mapper';

const prismaRequest = Prisma.validator<Prisma.DonationAlertArgs>()({
  include: {
    template: true,
  },
});

type PrismaDonationAlertWithTemplate = Prisma.DonationAlertGetPayload<
  typeof prismaRequest
>;

// TODO: better move '!' moment to be handled in repository
// do type overriding in repository and then send widgets to mapper
@Injectable()
export class DonationAlertMapper {
  constructor(
    private readonly donationAlertTemplateMapper: DonationAlertTemplateMapper,
  ) {}

  fromDbToAppWithTemplate(
    alert: PrismaDonationAlertWithTemplate,
  ): DonationAlertWithTemplate {
    return {
      ...alert,
      template: this.donationAlertTemplateMapper.fromDbToApp(alert.template!),
    };
  }
}
