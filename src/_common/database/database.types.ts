import { ID, Optional } from '../types';

export type BaseModel = {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
};

export type OmitBaseModel<
  T,
  OptionalKeys extends keyof T = never,
> = never extends OptionalKeys
  ? Omit<T, keyof BaseModel | OptionalKeys> & Partial<Pick<T, OptionalKeys>>
  : Omit<T, keyof BaseModel>;
