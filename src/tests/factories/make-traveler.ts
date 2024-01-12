import {
  Traveler,
  TravelerProps,
} from 'src/domain/application/entities/traveler.entity';
import { faker } from '@faker-js/faker';

export function makeTraveler(overrides: Partial<TravelerProps> = {}) {
  return Traveler.create({
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 150 }),
    document: faker.string.uuid(),
    ...overrides,
  });
}
