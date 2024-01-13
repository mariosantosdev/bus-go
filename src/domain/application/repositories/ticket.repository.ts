import { Repository } from '~/core/repositories/repository';
import { Ticket } from '../entities/ticket.entity';

export abstract class TicketRepository extends Repository<Ticket> {}
