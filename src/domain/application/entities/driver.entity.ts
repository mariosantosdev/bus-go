import { Entity } from '~/core/entities/entity';
import { ID } from '~/core/entities/id';

export interface DriverProps {
  name: string;
  driverLicense: string;
}

export class Driver extends Entity<DriverProps> {
  get name() {
    return this.props.name;
  }

  get driverLicense() {
    return this.props.driverLicense;
  }

  static create(props: DriverProps, id?: ID) {
    const driver = new Driver(props, id);

    return driver;
  }
}
