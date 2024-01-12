export abstract class ValueObject<Props> {
  protected props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }

  public equals(target: ValueObject<unknown>) {
    if (target === null || target === undefined) {
      return false;
    }

    if (target.props === undefined) {
      return false;
    }

    return JSON.stringify(target.props) === JSON.stringify(this.props);
  }
}
