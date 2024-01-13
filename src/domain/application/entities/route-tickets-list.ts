import { WatchedList } from '~/core/entities/watched-list';
import { Ticket } from './ticket.entity';

export class RouteTicketsList extends WatchedList<Ticket> {
  compareItems(a: Ticket, b: Ticket): boolean {
    return a.id.equals(b.id);
  }
}
