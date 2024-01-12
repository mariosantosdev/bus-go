import { Bus, BusProps } from 'src/domain/application/entities/bus.entity';
import { faker } from '@faker-js/faker';

export function makeBus(overrides: Partial<BusProps> = {}) {
  return Bus.create({
    brand: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.number.int({ min: 1900, max: 2024 }),
    seats: faker.number.int({ min: 20, max: 60 }),
    ...overrides,
  });
}
