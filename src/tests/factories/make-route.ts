import {
  Route,
  RouteProps,
} from 'src/domain/application/entities/route.entity';
import { makeTicket } from './make-ticket';
import { RouteTicketsList } from 'src/domain/application/entities/route-tickets-list';
import { makeBus } from './make-bus';
import { makeDriver } from './make-driver';
import { makeLocation } from './make-location';

export function makeRoute(overrides: Partial<RouteProps> = {}) {
  return Route.create({
    bus: makeBus(),
    departure: makeLocation(),
    destination: makeLocation(),
    driver: makeDriver(),
    tickets: new RouteTicketsList([makeTicket()]),
    ...overrides,
  });
}
