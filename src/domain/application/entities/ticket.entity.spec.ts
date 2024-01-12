import { makeTraveler } from 'src/tests/factories/make-traveler';
import { Ticket } from './ticket.entity';
import { TicketCanceled } from './errors/ticket-canceled.error';
import { TicketChecked } from './errors/ticker-checked.error';

describe('Ticket Entity', () => {
  it('should cancel a ticket', () => {
    const ticket = Ticket.create({
      traveler: makeTraveler(),
    });

    expect(ticket.canceledAt).toBeUndefined();

    const result = ticket.cancel();

    expect(result.isRight()).toBeTruthy();

    expect(ticket.canceledAt).toBeDefined();
  });

  it('should not cancel a ticket has already canceled', () => {
    const ticket = Ticket.create({
      traveler: makeTraveler(),
      canceledAt: new Date(),
    });

    expect(ticket.canceledAt).toBeDefined();

    const result = ticket.cancel();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(TicketCanceled);
  });

  it('should check in a ticket', () => {
    const ticket = Ticket.create({
      traveler: makeTraveler(),
    });

    expect(ticket.checkedAt).toBeUndefined();

    const result = ticket.checkIn();

    expect(result.isRight()).toBeTruthy();

    expect(ticket.checkedAt).toBeDefined();
  });

  it('should not check in a ticket twice', () => {
    const ticket = Ticket.create({
      traveler: makeTraveler(),
      checkIn: new Date(),
    });

    expect(ticket.checkedAt).toBeDefined();

    const result = ticket.checkIn();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(TicketChecked);
  });

  it('should not check in a canceld ticket', () => {
    const ticket = Ticket.create({
      traveler: makeTraveler(),
      canceledAt: new Date(),
    });

    expect(ticket.canceledAt).toBeDefined();

    const result = ticket.checkIn();

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(TicketCanceled);
  });
});
