import { UseCaseError } from '../use-case.error';

export class ResourceNotFound extends Error implements UseCaseError {
  constructor(resource: string, id: string) {
    super(`The resource "${resource}" with id "${id}" did not found.`);
    this.name = 'ResourceNotFoundError';
  }
}
