import { Either, left, right } from '~/core/either';
import { RouteRepository } from '../repositories/route.repository';
import { Injectable } from '@nestjs/common';
import { BusRepository } from '../repositories/bus.repository';
import { Route } from '../entities/route.entity';
import { Location } from '../entities/value-objects/location.value-object';
import { DriverRepository } from '../repositories/driver.repository';
import { RouteTicketsList } from '../entities/route-tickets-list';
import { UseCaseError } from '~/core/errors/use-case.error';
import { ResourceNotFound } from '~/core/errors/errors/resource-not-found.error';

interface RegisterRouteRequest {
  driverId: string;
  busId: string;
  destination: { latitude: number; longitude: number; address: string };
  departure: { latitude: number; longitude: number; address: string };
}

type RegisterRouteResponse = { route: Route };

@Injectable()
export class RegisterRouteUseCase {
  constructor(
    private routeRepository: RouteRepository,
    private busRepository: BusRepository,
    private driverRepository: DriverRepository,
  ) {}

  async execute({
    driverId,
    busId,
    destination,
    departure,
  }: RegisterRouteRequest): Promise<
    Either<UseCaseError, RegisterRouteResponse>
  > {
    const bus = await this.busRepository.findById(busId);

    if (!bus) return left(new ResourceNotFound('Bus', busId));

    const driver = await this.driverRepository.findById(driverId);

    if (!driver) return left(new ResourceNotFound('Driver', driverId));

    const route = Route.create({
      bus,
      driver,
      tickets: new RouteTicketsList([]),
      departure: Location.create(departure),
      destination: Location.create(destination),
    });

    await this.routeRepository.create(route);

    return right({ route });
  }
}
