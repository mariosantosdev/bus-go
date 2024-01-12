import {
  Ticket,
  TicketProps,
} from 'src/domain/application/entities/ticket.entity';
import { makeTraveler } from './make-traveler';

export function makeTicket(overrides: Partial<TicketProps> = {}) {
  return Ticket.create({
    traveler: makeTraveler(),
    ...overrides,
  });
}
