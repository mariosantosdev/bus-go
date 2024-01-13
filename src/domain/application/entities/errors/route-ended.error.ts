import { EntityError } from '~/core/errors/entity.error';

export class RouteEnded extends Error implements EntityError {
  constructor(id: string) {
    super(`The route "${id}" has already ended.`);
    this.name = 'RouteEndedError';
  }
}
