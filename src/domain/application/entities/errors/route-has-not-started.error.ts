import { EntityError } from '~/core/errors/entity.error';

export class RouteHasNotStarted extends Error implements EntityError {
  constructor(id: string) {
    super(`The route "${id}" has not started.`);
    this.name = 'RouteHasNotStartedError';
  }
}
