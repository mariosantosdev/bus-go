import { EntityError } from '~/core/errors/entity.error';

export class BusEmpty extends Error implements EntityError {
  constructor(id: string) {
    super(`The bus of route "${id}" is empty.`);
    this.name = 'BusEmptyError';
  }
}
