import { Entity } from '~/core/entities/entity';
import { ID } from '~/core/entities/id';
import { Optional } from '~/core/types/optional';

interface BusProps {
  seats: number;
  year: number;
  model: string;
  brand: string;
  boughtAt: Date;
}

export class Bus extends Entity<BusProps> {
  get seats() {
    return this.props.seats;
  }

  static create(props: Optional<BusProps, 'boughtAt'>, id?: ID) {
    const bus = new Bus(
      {
        ...props,
        boughtAt: new Date(),
      },
      id,
    );

    return bus;
  }
}
