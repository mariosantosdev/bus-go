import { Injectable } from '@nestjs/common';
import {
  PaginationParams,
  PaginationResult,
} from '~/core/repositories/pagination';
import { Repository } from '~/core/repositories/repository';
import { Driver } from '~/domain/application/entities/driver.entity';

@Injectable()
export class InMemoryDriverRepository extends Repository<Driver> {
  public items: Driver[] = [];

  async create(object: Driver): Promise<void> {
    this.items.push(object);
  }

  async delete(object: Driver): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(object.id));
  }

  async findAll(
    { page, perPage }: PaginationParams = { page: 1, perPage: 20 },
  ): Promise<PaginationResult<Driver>> {
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

  async findById(id: string): Promise<Driver> {
    return this.items.find((item) => item.id.toString() === id);
  }

  async update(object: Driver): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(object.id));
    this.items[index] = object;
  }
}
