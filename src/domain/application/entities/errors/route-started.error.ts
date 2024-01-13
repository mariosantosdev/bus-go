import { EntityError } from '~/core/errors/entity.error';

export class RouteStarted extends Error implements EntityError {
  constructor(id: string) {
    super(`The route "${id}" has already started.`);
    this.name = 'RouteStartedError';
  }
}
