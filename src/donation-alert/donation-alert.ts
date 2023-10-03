import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { DonationAlertTemplate } from 'src/donation-alert-template/donation-alert-template.types';

export type DonationAlert = BaseModel & {
  name: string;
  minAmount: number | null;
  maxAmount: number | null;
  specificAmount: number | null;
  isEnabled: boolean;
  duration: number;
  userId: ID;
  alertWidgetId: ID;
};

export type DonationAlertWithTemplate = DonationAlert & {
  template: DonationAlertTemplate;
};
