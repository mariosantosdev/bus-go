import { EntityError } from '~/core/errors/entity.error';

export class RouteCanceled extends Error implements EntityError {
  constructor(id: string) {
    super(`The route "${id}" has already canceled.`);
    this.name = 'RouteCanceledError';
  }
}
