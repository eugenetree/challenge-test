import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { DonationAlert } from 'src/donation-alert/donation-alert';
import { UiTextElement } from 'src/ui-elements/ui-text-element';

export type DonationAlertTemplate = BaseModel & {
  name: string | null;
  userId: ID;
  donationAlertId: ID;
};

export type DonationAlertTemplateWithDonationAlert = DonationAlertTemplate & {
  donationAlert: DonationAlert;
};

export type DonationAlertTemplateWithNested = DonationAlertTemplate & {
  uiTextElements: UiTextElement[];
};
