import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { WidgetTemplateText } from 'src/widget/widget-template-text/widget-template-text';

export type DonationAlertWidgetTemplate = {
  name: string;
  userId: ID;
  donationAlertWidgetId: ID;
} & BaseModel;

export type DonationAlertWidgetTemplateWithElements = {
  widgetTemplateTexts?: WidgetTemplateText[];
} & DonationAlertWidgetTemplate;
