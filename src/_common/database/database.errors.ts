import { ID } from "../types";

type DbEntity = 'user' | 'donation';

export class EntityNotFoundError extends Error {
  constructor({ entityName, id }: { entityName: DbEntity, id: ID }) {
    super(`Entity ${entityName} with id ${id} not found`);
  }
}