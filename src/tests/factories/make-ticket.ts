import {
  Ticket,
  TicketProps,
} from 'src/domain/application/entities/ticket.entity';
import { makeTraveler } from './make-traveler';
import { faker } from '@faker-js/faker';

export function makeTicket(overrides: Partial<TicketProps> = {}) {
  return Ticket.create({
    traveler: makeTraveler(),
    value: Number(faker.commerce.price()),
    ...overrides,
  });
}
