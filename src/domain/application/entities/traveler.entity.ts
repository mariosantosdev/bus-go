import { Entity } from '~/core/entities/entity';
import { ID } from '~/core/entities/id';

export interface TravelerProps {
  name: string;
  age: number;
  document: string;
}

export class Traveler extends Entity<TravelerProps> {
  get name() {
    return this.props.name;
  }

  static create(props: TravelerProps, id?: ID) {
    const traveler = new Traveler(props, id);

    return traveler;
  }
}
