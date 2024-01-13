import { Injectable } from '@nestjs/common';
import {
  PaginationParams,
  PaginationResult,
} from '~/core/repositories/pagination';
import { Repository } from '~/core/repositories/repository';
import { Traveler } from '~/domain/application/entities/traveler.entity';

@Injectable()
export class InMemoryTravelerRepository extends Repository<Traveler> {
  public items: Traveler[] = [];

  async create(object: Traveler): Promise<void> {
    this.items.push(object);
  }

  async delete(object: Traveler): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(object.id));
  }

  async findAll(
    { page, perPage }: PaginationParams = { page: 1, perPage: 20 },
  ): Promise<PaginationResult<Traveler>> {
    const items = this.items.slice((page - 1) * perPage, page * perPage);

    const totalItems = items.length;

    const totalPages = items.length / perPage;

    return {
      items,
      page,
      perPage,
      totalItems,
      totalPages,
    };
  }

  async findById(id: string): Promise<Traveler> {
    return this.items.find((item) => item.id.toString() === id);
  }

  async update(object: Traveler): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(object.id));
    this.items[index] = object;
  }
}
