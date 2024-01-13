import { Either, right } from '~/core/either';
import { Bus } from '../entities/bus.entity';
import { Injectable } from '@nestjs/common';
import { BusRepository } from '../repositories/bus.repository';

interface BuyBusRequest {
  brand: string;
  model: string;
  seats: number;
  year: number;
}

type BuyBusResponse = {
  bus: Bus;
};

@Injectable()
export class BuyBusUseCase {
  constructor(private busRepository: BusRepository) {}

  async execute({
    brand,
    model,
    seats,
    year,
  }: BuyBusRequest): Promise<Either<null, BuyBusResponse>> {
    const bus = Bus.create({
      brand,
      model,
      seats,
      year,
      boughtAt: new Date(),
    });

    await this.busRepository.create(bus);

    return right({ bus });
  }
}
