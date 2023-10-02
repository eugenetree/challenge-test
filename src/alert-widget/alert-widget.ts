import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { DonationAlertTemplate } from 'src/donation-alert-template/donation-alert-template.types';
import { DonationAlert } from 'src/donation-alert/donation-alert';
import { UiTextElement } from 'src/ui-elements/ui-text-element';

export type AlertWidget = BaseModel & {
  name: string;
  isEnabled: boolean;
  userId: ID;
};

export type AlertWidgetWithRelations = AlertWidget & {
  donationAlerts: (DonationAlert & {
    template: DonationAlertTemplate & { uiTextElements: UiTextElement[] };
  })[];
};
