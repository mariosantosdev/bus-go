import { ValueObject } from '~/core/entities/value-object';

export interface LocationProps {
  latitude: number;
  longitude: number;
  address: string;
}

export class Location extends ValueObject<LocationProps> {
  get lat() {
    return this.props.latitude;
  }

  get long() {
    return this.props.longitude;
  }

  get address() {
    return this.props.address;
  }

  static create(props: LocationProps) {
    const location = new Location(props);

    return location;
  }
}
