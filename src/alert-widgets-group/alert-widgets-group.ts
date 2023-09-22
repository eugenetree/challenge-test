import { BaseModel } from 'src/_common/database/database.types';
import { ID } from 'src/_common/types';

export type AlertWidgetsGroup = {
  name: string;
  userId: ID;
} & BaseModel;
