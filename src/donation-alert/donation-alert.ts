import { ID } from 'src/_common/types';

export type DonationAlert = {
  id: ID;
  name: string;
  minAmount: number | null;
  maxAmount: number | null;
  specificAmount: number | null;
  isEnabled: boolean;
  duration: number;
  userId: ID;
  alertWidgetId: ID;
};
