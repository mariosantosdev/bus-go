import { ID } from './id';

export abstract class Entity<Props> {
  private _id: ID;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: ID) {
    this.props = props;
    this._id = id ?? new ID();
  }

  public equals(target: Entity<unknown>) {
    if (this === target || this.id.equals(target.id)) return true;

    return false;
  }
}
