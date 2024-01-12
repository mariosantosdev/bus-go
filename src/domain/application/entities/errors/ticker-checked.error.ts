import { EntityError } from '~/core/errors/entity.error';

export class TicketChecked extends Error implements EntityError {
  constructor(id: string) {
    super(`The ticket "${id}" has already checked.`);
    this.name = 'TicketCheckedError';
  }
}
