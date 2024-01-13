import { Test, TestingModule } from '@nestjs/testing';
import { RegisterRouteUseCase } from './register-route.use-case';
import { InMemoryRouteRepository } from 'src/tests/repositories/in-memory-route.repository';
import { RouteRepository } from '../repositories/route.repository';
import { makeBus } from 'src/tests/factories/make-bus';
import { makeDriver } from 'src/tests/factories/make-driver';
import { makeLocation } from 'src/tests/factories/make-location';
import { BusRepository } from '../repositories/bus.repository';
import { InMemoryBusRepository } from 'src/tests/repositories/in-memory-bus.repository';
import { DriverRepository } from '../repositories/driver.repository';
import { InMemoryDriverRepository } from 'src/tests/repositories/in-memory-driver.repository';
import { ResourceNotFound } from '~/core/errors/errors/resource-not-found.error';

describe('RegisterRouteUseCase', () => {
  let service: RegisterRouteUseCase;
  let routeRepository: InMemoryRouteRepository;
  let busRepository: InMemoryBusRepository;
  let driverRepository: InMemoryDriverRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterRouteUseCase,
        {
          provide: RouteRepository,
          useClass: InMemoryRouteRepository,
        },
        {
          provide: BusRepository,
          useClass: InMemoryBusRepository,
        },
        {
          provide: DriverRepository,
          useClass: InMemoryDriverRepository,
        },
      ],
    }).compile();

    service = module.get(RegisterRouteUseCase);
    routeRepository = module.get(RouteRepository);
    busRepository = module.get(BusRepository);
    driverRepository = module.get(DriverRepository);
  });

  it('should register a new route', async () => {
    const bus = makeBus();

    busRepository.items.push(bus);

    const driver = makeDriver();

    driverRepository.items.push(driver);

    const departure = makeLocation();
    const destination = makeLocation();

    const result = await service.execute({
      busId: bus.id.toString(),
      driverId: driver.id.toString(),
      departure: {
        latitude: departure.lat,
        longitude: departure.long,
        address: departure.address,
      },
      destination: {
        latitude: destination.lat,
        longitude: destination.long,
        address: destination.address,
      },
    });

    expect(result.isRight()).toBeTruthy();

    expect(routeRepository.items).toHaveLength(1);
  });

  it('should not register a new route without driver', async () => {
    const bus = makeBus();

    busRepository.items.push(bus);

    const departure = makeLocation();
    const destination = makeLocation();

    const result = await service.execute({
      busId: bus.id.toString(),
      driverId: 'fake-driver',
      departure: {
        latitude: departure.lat,
        longitude: departure.long,
        address: departure.address,
      },
      destination: {
        latitude: destination.lat,
        longitude: destination.long,
        address: destination.address,
      },
    });

    expect(result.isRight()).toBeFalsy();

    expect(result.value).toBeInstanceOf(ResourceNotFound);

    expect(routeRepository.items).toHaveLength(0);
  });

  it('should not register a new route without bus', async () => {
    const driver = makeDriver();

    driverRepository.items.push(driver);

    const departure = makeLocation();
    const destination = makeLocation();

    const result = await service.execute({
      busId: 'fake-bus',
      driverId: driver.id.toString(),
      departure: {
        latitude: departure.lat,
        longitude: departure.long,
        address: departure.address,
      },
      destination: {
        latitude: destination.lat,
        longitude: destination.long,
        address: destination.address,
      },
    });

    expect(result.isRight()).toBeFalsy();

    expect(result.value).toBeInstanceOf(ResourceNotFound);

    expect(routeRepository.items).toHaveLength(0);
  });
});
