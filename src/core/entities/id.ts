import { randomUUID } from 'node:crypto';

export class ID {
  private value: string;

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  public toString() {
    return this.value;
  }

  public equals(id: ID) {
    return id.toString() == id.toString();
  }
}
