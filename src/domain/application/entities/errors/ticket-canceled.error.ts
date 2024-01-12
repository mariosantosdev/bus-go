import { EntityError } from '~/core/errors/entity.error';

export class TicketCanceled extends Error implements EntityError {
  constructor(id: string) {
    super(`The ticket "${id}" has already canceled.`);
    this.name = 'TicketCanceledError';
  }
}
