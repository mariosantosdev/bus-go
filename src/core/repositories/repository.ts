import { PaginationParams, PaginationResult } from './pagination';

export abstract class Repository<T> {
  abstract create(object: T): Promise<void>;
  abstract delete(object: T): Promise<void>;
  abstract update(object: T): Promise<void>;
  abstract findById(id: string): Promise<T>;
  abstract findAll(params: PaginationParams): Promise<PaginationResult<T>>;
}
