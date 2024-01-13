import { Injectable } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repository';
import { Either, left, right } from '~/core/either';
import { EntityError } from '~/core/errors/entity.error';
import { ResourceNotFound } from '~/core/errors/errors/resource-not-found.error';
import { UseCaseError } from '~/core/errors/use-case.error';

interface CancelRouteRequest {
  routeId: string;
}

@Injectable()
export class CancelRouteUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute({
    routeId,
  }: CancelRouteRequest): Promise<Either<UseCaseError | EntityError, null>> {
    const route = await this.routeRepository.findById(routeId);

    if (!route) return left(new ResourceNotFound('Route', routeId));

    const result = route.cancelRoute();

    if (result.isLeft()) return left(result.value);

    await this.routeRepository.update(route);

    return right(null);
  }
}
