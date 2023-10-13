import { BaseModel, OmitBaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';
import { DonationAlert } from 'src/donation-alert/donation-alert.types';

export type UiTextElement = {
  id: ID;
  name: string;
  text: string;
  styleConfig: {
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    align: string;
    color: string;
    shadowColor: string;
    shadowSize: number;
  };
  animationConfig: {
    in: string;
    out: string;
  };
  positionConfig: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export type UiImageElement = {
  id: ID;
  name: string;
  src: string;
  styleConfig: {
    width: number;
    height: number;
  };
  animationConfig: {
    in: string;
    out: string;
  };
  positionConfig: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export type DonationAlertTemplate = BaseModel & {
  name: string | null;
  elements: {
    texts?: UiTextElement[];
    images?: UiImageElement[];
  };
  userId: ID;
  donationAlertId: ID;
};

export type DonationAlertTemplateWithDonationAlert = DonationAlertTemplate & {
  donationAlert: DonationAlert;
};

export type DonationAlertTemplateCreateInput = OmitBaseModel<
  DonationAlertTemplate,
  'name'
>;
