import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { WidgetTemplateText } from 'src/widget/widget-template-text/widget-template-text';

export type DonationAlertTemplate = {
  name: string;
  userId: ID;
  donationAlertId: ID;
} & BaseModel;

export type DonationAlertTemplateWithElements = {
  widgetTemplateTexts?: WidgetTemplateText[];
} & DonationAlertTemplate;
