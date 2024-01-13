import { EntityError } from '~/core/errors/entity.error';

export class BusCrowded extends Error implements EntityError {
  constructor(id: string) {
    super(`The bus of route "${id}" is crowded.`);
    this.name = 'BusCrowdedError';
  }
}
