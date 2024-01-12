import { Entity } from '~/core/entities/entity';
import { Traveler } from './traveler.entity';
import { Optional } from '~/core/types/optional';
import { ID } from '~/core/entities/id';
import { Either, left, right } from '~/core/either';
import { TicketCanceled } from './errors/ticket-canceled.error';
import { TicketChecked } from './errors/ticker-checked.error';

export interface TicketProps {
  traveler: Traveler;
  value: number;
  emissionDate: Date;
  checkIn?: Date;
  canceledAt?: Date;
}

export class Ticket extends Entity<TicketProps> {
  get canceledAt() {
    return this.props.canceledAt;
  }

  get checkedAt() {
    return this.props.checkIn;
  }

  static create(
    props: Optional<TicketProps, 'emissionDate' | 'checkIn' | 'canceledAt'>,
    id?: ID,
  ) {
    const ticket = new Ticket(
      {
        ...props,
        emissionDate: new Date(),
      },
      id,
    );

    return ticket;
  }

  public cancel(): Either<TicketCanceled, null> {
    if (this.canceledAt != null)
      return left(new TicketCanceled(this.id.toString()));

    this.props.canceledAt = new Date();

    return right(null);
  }

  public checkIn(): Either<TicketCanceled | TicketChecked, null> {
    if (this.canceledAt != null)
      return left(new TicketCanceled(this.id.toString()));

    if (this.checkedAt != null)
      return left(new TicketChecked(this.id.toString()));

    this.props.checkIn = new Date();

    return right(null);
  }
}
