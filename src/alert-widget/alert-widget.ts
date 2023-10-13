import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { DonationAlertWithTemplate } from 'src/donation-alert/donation-alert.types';

export type AlertWidget = BaseModel & {
  name: string;
  isEnabled: boolean;
  userId: ID;
};

export type AlertWidgetWithNested = AlertWidget & {
  donationAlerts: DonationAlertWithTemplate[];
};
