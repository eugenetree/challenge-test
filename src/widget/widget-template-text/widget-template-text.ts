import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';

export type WidgetTemplateText = {
  name: string;
  text: string;
  styleConfig: {
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
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
  donationAlertTemplateId: ID;
} & BaseModel;
