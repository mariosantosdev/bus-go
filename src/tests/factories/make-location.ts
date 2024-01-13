import {
  Location,
  LocationProps,
} from 'src/domain/application/entities/value-objects/location.value-object';
import { faker } from '@faker-js/faker';

export function makeLocation(overrides: Partial<LocationProps> = {}) {
  return Location.create({
    address: faker.location.streetAddress(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    ...overrides,
  });
}
