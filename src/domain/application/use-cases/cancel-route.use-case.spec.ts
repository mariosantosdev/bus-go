import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRouteRepository } from 'src/tests/repositories/in-memory-route.repository';
import { RouteRepository } from '../repositories/route.repository';
import { makeRoute } from 'src/tests/factories/make-route';
import { CancelRouteUseCase } from './cancel-route.use-case';
import { ResourceNotFound } from '~/core/errors/errors/resource-not-found.error';

describe('CancelRouteUseCase', () => {
  let service: CancelRouteUseCase;
  let routeRepository: InMemoryRouteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelRouteUseCase,
        {
          provide: RouteRepository,
          useClass: InMemoryRouteRepository,
        },
      ],
    }).compile();

    service = module.get(CancelRouteUseCase);
    routeRepository = module.get(RouteRepository);
  });

  it('should cancel a route', async () => {
    const route = makeRoute();

    routeRepository.items.push(route);

    expect(route.canceledAt).toBeUndefined();

    const result = await service.execute({
      routeId: route.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();

    expect(route.canceledAt).toBeDefined();
  });

  it('should not cancel a route when not found', async () => {
    const result = await service.execute({
      routeId: 'fake-route',
    });

    expect(result.isRight()).toBeFalsy();

    expect(result.value).toBeInstanceOf(ResourceNotFound);
  });
});
