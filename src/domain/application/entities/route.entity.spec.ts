import { makeRoute } from 'src/tests/factories/make-route';
import { RouteStarted } from './errors/route-started.error';
import { makeBus } from 'src/tests/factories/make-bus';
import { RouteTicketsList } from './route-tickets-list';
import { makeTicket } from 'src/tests/factories/make-ticket';
import { RouteCanceled } from './errors/route-canceled.error';
import { BusCrowded } from './errors/bus-crowded.error';
import { BusEmpty } from './errors/bus-empty.error';
import { faker } from '@faker-js/faker';
import { RouteHasNotStarted } from './errors/route-has-not-started.error';
import { RouteEnded } from './errors/route-ended.error';

describe('Route Entity', () => {
  it('should cancel a route', () => {
    const route = makeRoute();

    expect(route.canceledAt).toBeUndefined();

    const result = route.cancelRoute();

    expect(result.isRight()).toBeTruthy();

    expect(route.canceledAt).toBeDefined();
  });

  it('should not cancel a route has already started', () => {
    const route = makeRoute({
      startedAt: new Date(),
    });

    expect(route.canceledAt).toBeUndefined();

    const result = route.cancelRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(route.canceledAt).toBeUndefined();

    expect(result.value).toBeInstanceOf(RouteStarted);
  });

  it('should not cancel a route twice', () => {
    const canceledAt = new Date();

    const route = makeRoute({ canceledAt });

    expect(route.canceledAt).toBeDefined();

    const result = route.cancelRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(route.canceledAt).toEqual(canceledAt);

    expect(result.value).toBeInstanceOf(RouteCanceled);
  });

  it('should add a new ticket', () => {
    const route = makeRoute({
      tickets: new RouteTicketsList([makeTicket()]),
    });

    expect(route.tickets.getItems().length).toEqual(1);

    const result = route.addTicket(makeTicket());

    expect(result.isRight()).toBeTruthy();

    expect(route.tickets.getItems().length).toEqual(2);
  });

  it('should not add a new ticket after route has started', () => {
    const route = makeRoute({
      startedAt: new Date(),
    });

    const initialAvailableSeats = route.availableSeats();

    const result = route.addTicket(makeTicket());

    expect(route.availableSeats()).toEqual(initialAvailableSeats);

    expect(result.isLeft());

    expect(result.value).toBeInstanceOf(RouteStarted);
  });

  it('should not add a new ticket after route has canceled', () => {
    const route = makeRoute({
      canceledAt: new Date(),
    });

    const initialAvailableSeats = route.availableSeats();

    const result = route.addTicket(makeTicket());

    expect(route.availableSeats()).toEqual(initialAvailableSeats);

    expect(result.isLeft());

    expect(result.value).toBeInstanceOf(RouteCanceled);
  });

  it('should not add a new ticket in crowded bus', () => {
    const route = makeRoute({
      bus: makeBus({ seats: 2 }),
      tickets: new RouteTicketsList([makeTicket(), makeTicket()]),
    });

    expect(route.availableSeats()).toEqual(0);

    const result = route.addTicket(makeTicket());

    expect(route.availableSeats()).toEqual(0);

    expect(result.isLeft());

    expect(result.value).toBeInstanceOf(BusCrowded);
  });

  it('should get available seats', () => {
    const route = makeRoute({
      bus: makeBus({ seats: 5 }),
      tickets: new RouteTicketsList([makeTicket(), makeTicket()]),
    });

    expect(route.availableSeats()).toEqual(3);

    route.addTicket(makeTicket());

    expect(route.availableSeats()).toEqual(2);
  });

  it('should start a route', () => {
    const route = makeRoute();

    expect(route.startedAt).toBeUndefined();

    const result = route.startRoute();

    expect(result.isRight()).toBeTruthy();

    expect(route.startedAt).toBeDefined();
  });

  it('should not start a route twice', () => {
    const route = makeRoute({
      startedAt: new Date(),
    });

    expect(route.startedAt).toBeDefined();

    const result = route.startRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(RouteStarted);
  });

  it('should not start a route has canceled', () => {
    const route = makeRoute({
      canceledAt: new Date(),
    });

    expect(route.canceledAt).toBeDefined();

    const result = route.startRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(RouteCanceled);
  });

  it('should not start a route without tickets', () => {
    const route = makeRoute({
      tickets: new RouteTicketsList([]),
    });

    const result = route.startRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(BusEmpty);
  });

  it('should end a route', () => {
    const route = makeRoute({
      startedAt: faker.date.recent(),
    });

    expect(route.startedAt).toBeDefined();

    expect(route.arrivedAt).toBeUndefined();

    const result = route.endRoute();

    expect(result.isRight()).toBeTruthy();

    expect(route.arrivedAt).toBeDefined();
  });

  it('should not end a route twice', () => {
    const route = makeRoute({
      startedAt: faker.date.recent(),
      arrivedAt: new Date(),
    });

    const result = route.endRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(RouteEnded);
  });

  it('should not end a route before start', () => {
    const route = makeRoute();

    expect(route.startedAt).toBeUndefined();

    expect(route.arrivedAt).toBeUndefined();

    const result = route.endRoute();

    expect(result.isLeft()).toBeTruthy();

    expect(route.arrivedAt).toBeUndefined();

    expect(result.value).toBeInstanceOf(RouteHasNotStarted);
  });
});
