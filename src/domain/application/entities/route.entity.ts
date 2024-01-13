import { Entity } from '~/core/entities/entity';
import { ID } from '~/core/entities/id';
import { Driver } from './driver.entity';
import { Bus } from './bus.entity';
import { Optional } from '~/core/types/optional';
import { RouteTicketsList } from './route-tickets-list';
import { Location } from './value-objects/location.value-object';
import { Either, left, right } from '~/core/either';
import { RouteStarted } from './errors/route-started.error';
import { Ticket } from './ticket.entity';
import { RouteCanceled } from './errors/route-canceled.error';
import { BusCrowded } from './errors/bus-crowded.error';
import { BusEmpty } from './errors/bus-empty.error';
import { RouteHasNotStarted } from './errors/route-has-not-started.error';
import { RouteEnded } from './errors/route-ended.error';

export interface RouteProps {
  driver: Driver;
  bus: Bus;
  tickets: RouteTicketsList;
  destination: Location;
  departure: Location;
  canceledAt?: Date;
  startedAt?: Date;
  arrivedAt?: Date;
  createdAt?: Date;
}

export class Route extends Entity<RouteProps> {
  get canceledAt() {
    return this.props.canceledAt;
  }

  get bus() {
    return this.props.bus;
  }

  get tickets() {
    return this.props.tickets;
  }

  get startedAt() {
    return this.props.startedAt;
  }

  get arrivedAt() {
    return this.props.arrivedAt;
  }

  static create(
    props: Optional<
      RouteProps,
      'startedAt' | 'arrivedAt' | 'canceledAt' | 'createdAt'
    >,
    id?: ID,
  ) {
    const route = new Route(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return route;
  }

  public cancelRoute(): Either<RouteStarted, null> {
    if (this.props.canceledAt != null)
      return left(new RouteCanceled(this.id.toString()));

    if (this.props.startedAt != null)
      return left(new RouteStarted(this.id.toString()));

    this.props.canceledAt = new Date();

    return right(null);
  }

  public availableSeats() {
    const busSeats = this.bus.seats;

    return busSeats - this.tickets.getItems().length;
  }

  public addTicket(
    ticket: Ticket,
  ): Either<RouteStarted | RouteCanceled | BusCrowded, null> {
    if (this.props.startedAt != null)
      return left(new RouteStarted(this.id.toString()));

    if (this.props.canceledAt != null)
      return left(new RouteCanceled(this.id.toString()));

    if (this.availableSeats() === 0)
      return left(new BusCrowded(this.id.toString()));

    this.props.tickets.add(ticket);

    return right(null);
  }

  public startRoute(): Either<RouteStarted | RouteCanceled | BusEmpty, null> {
    if (this.props.startedAt != null)
      return left(new RouteStarted(this.id.toString()));

    if (this.props.canceledAt != null)
      return left(new RouteCanceled(this.id.toString()));

    if (this.tickets.getItems().length === 0)
      return left(new BusEmpty(this.id.toString()));

    this.props.startedAt = new Date();

    return right(null);
  }

  public endRoute(): Either<RouteHasNotStarted, null> {
    if (this.props.arrivedAt != null)
      return left(new RouteEnded(this.id.toString()));

    if (!this.props.startedAt)
      return left(new RouteHasNotStarted(this.id.toString()));

    this.props.arrivedAt = new Date();

    return right(null);
  }
}
