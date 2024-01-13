import { Injectable } from '@nestjs/common';
import {
  PaginationParams,
  PaginationResult,
} from '~/core/repositories/pagination';
import { Repository } from '~/core/repositories/repository';
import { Route } from '~/domain/application/entities/route.entity';

@Injectable()
export class InMemoryRouteRepository extends Repository<Route> {
  public items: Route[] = [];

  async create(object: Route): Promise<void> {
    this.items.push(object);
  }

  async delete(object: Route): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(object.id));
  }

  async findAll(
    { page, perPage }: PaginationParams = { page: 1, perPage: 20 },
  ): Promise<PaginationResult<Route>> {
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

  async findById(id: string): Promise<Route> {
    return this.items.find((item) => item.id.toString() === id);
  }

  async update(object: Route): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(object.id));
    this.items[index] = object;
  }
}
