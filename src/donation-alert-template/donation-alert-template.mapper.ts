import { Injectable } from '@nestjs/common';
import { DonationAlertTemplate as PrismaDonationAlertTemplate } from '@prisma/client';
import { DonationAlertTemplate } from './donation-alert-template.types';

@Injectable()
export class DonationAlertTemplateMapper {
  constructor() {}

  fromDbToApp<T extends PrismaDonationAlertTemplate>(
    template: T,
  ): T & { elements: DonationAlertTemplate['elements'] } {
    return {
      ...template,
      elements: JSON.parse(template.elements),
    };
  }
}
