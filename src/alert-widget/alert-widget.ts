import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';

export type AlertWidget = {
  name: string;
  userId: ID;
} & BaseModel;
