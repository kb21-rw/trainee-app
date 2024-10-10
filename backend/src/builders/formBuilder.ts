import { IForm } from "../models/Form";

export class Form {
  public readonly _id: string;
  public readonly name?: string;
  public readonly description?: string;
  public readonly questionIds?: string[];

  public constructor(data: Partial<IForm>) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.questionIds = data.questionIds;
  }
}

export class FormBuilder {
  private readonly properties: Partial<IForm> = {
    _id: "66203fa2a3465a4a588d12f1",
    name: "Test form",
    description: "form description",
    questionIds: [],
  };

  public static from(properties: Partial<IForm>): FormBuilder {
    return new FormBuilder().with(properties);
  }

  public with(properties: Partial<IForm>): this {
    let key: keyof IForm;

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

  public withId(_id: string): this {
    this.properties._id = _id;
    return this;
  }

  public withName(name: string): this {
    this.properties.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.properties.description = description;
    return this;
  }

  public withQuestionIds(questionIds: string[]): this {
    this.properties.questionIds = questionIds;
    return this;
  }

  public build(): Partial<IForm> {
    return new Form({
      ...this.properties,
    });
  }
}
