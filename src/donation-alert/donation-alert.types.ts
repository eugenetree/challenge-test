import { BaseModel, OmitBaseModel } from 'src/_common/database/database.types';
import { ID, MakeNullableFieldsOptional } from 'src/_common/types';
import {
  DonationAlertTemplate,
  DonationAlertTemplateCreateInput,
} from 'src/donation-alert-template/donation-alert-template.types';

export type DonationAlert = BaseModel & {
  name: string;
  alertCondition: 'random' | 'specificAmount' | 'minMaxAmount';
  minAmount: number | null;
  maxAmount: number | null;
  specificAmount: number | null;
  isEnabled: boolean;
  duration: number;
  userId: ID;
  alertWidgetId: ID;
};

export type DonationAlertCreateInput = MakeNullableFieldsOptional<
  OmitBaseModel<DonationAlert, 'name' | 'isEnabled' | 'duration' | 'alertCondition'>
>;

export type DonationAlertWithCustomTemplateCreateInput = {
  alert: MakeNullableFieldsOptional<OmitBaseModel<DonationAlert, 'name' | 'isEnabled' | 'duration'>>;
  template: Omit<DonationAlertTemplateCreateInput, 'donationAlertId' | 'userId'>;
}

// export type DonationAlertWithCustomTemplateCreateInput =
//   MakeNullableFieldsOptional<
//     OmitBaseModel<DonationAlert, 'name' | 'isEnabled' | 'duration'> & {
//       template: Omit<
//         DonationAlertTemplateCreateInput,
//         'donationAlertId' | 'userId'
//       >;
//     }
//   >;

export type DonationAlertWithTemplate = DonationAlert & {
  template: DonationAlertTemplate;
};
