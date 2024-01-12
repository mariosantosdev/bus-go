import {
  Driver,
  DriverProps,
} from 'src/domain/application/entities/driver.entity';
import { faker } from '@faker-js/faker';

export function makeDriver(overrides: Partial<DriverProps> = {}) {
  return Driver.create({
    driverLicense: faker.string.uuid(),
    name: faker.person.fullName(),
    ...overrides,
  });
}
