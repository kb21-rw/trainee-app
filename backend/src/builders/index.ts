export abstract class Builder<
  S extends { new (...args: any[]): T },
  T extends { id: string },
> {
  protected constructor(protected Model: S) {}

  protected abstract readonly properties: T;

  public with(properties: Partial<T>): this {
    let key: keyof T;

    for (key in properties) {
      const value = properties[key];

      if (value !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.properties[key] = value;
      }
    }

    return this;
  }

  public withId(id: string): this {
    this.properties.id = id;
    return this;
  }

  public build(): T {
    return new this.Model({
      ...this.properties,
    });
  }
}
