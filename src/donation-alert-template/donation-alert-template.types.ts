import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { UiTextElement } from 'src/ui-elements/ui-text-element';

export type DonationAlertTemplate = {
  name: string;
  userId: ID;
  donationAlertId: ID;
} & BaseModel;

export type DonationAlertTemplateWithElements = {
  uiTextElements: UiTextElement[];
} & DonationAlertTemplate;
