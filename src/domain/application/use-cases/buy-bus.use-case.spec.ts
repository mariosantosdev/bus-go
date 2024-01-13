import { Test, TestingModule } from '@nestjs/testing';
import { BuyBusUseCase } from './buy-bus.use-case';
import { BusRepository } from '../repositories/bus.repository';
import { InMemoryBusRepository } from 'src/tests/repositories/in-memory-bus.repository';
import { faker } from '@faker-js/faker';

describe('BuyBusUseCase', () => {
  let service: BuyBusUseCase;

  let busRepository: InMemoryBusRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuyBusUseCase,
        {
          provide: BusRepository,
          useClass: InMemoryBusRepository,
        },
      ],
    }).compile();

    service = module.get(BuyBusUseCase);

    busRepository = module.get(BusRepository);
  });

  it('should register a new bus', async () => {
    const result = await service.execute({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      seats: faker.number.int({ min: 20, max: 60 }),
      year: faker.number.int({ min: 1900, max: 2024 }),
    });

    expect(result.isRight()).toBeTruthy();

    expect(busRepository.items).toHaveLength(1);
  });
});
