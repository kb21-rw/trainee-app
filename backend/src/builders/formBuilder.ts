import { FormProperties } from "../models/Form";

export class Form {
  public readonly _id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly questionsId: string[];

  public constructor(data: FormProperties) {
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.questionsId = data.questionsId;
  }
}

export class FormBuilder {
  private readonly properties: FormProperties = {
    _id: "66203fa2a3465a4a588d12f1",
    title: "Test form",
    description: "form description",
    questionsId: [],
  };

  public static from(properties: Partial<FormProperties>): FormBuilder {
    return new FormBuilder().with(properties);
  }

  public with(properties: Partial<FormProperties>): this {
    let key: keyof FormProperties;

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

  public withTitle(id: string): this {
    this.properties.title = id;
    return this;
  }

  public withDescription(description: string): this {
    this.properties.description = description;
    return this;
  }

  public withQuestionsId(questionsId: string[]): this {
    this.properties.questionsId = questionsId;
    return this;
  }

  public build(): FormProperties {
    return new Form({
      ...this.properties,
    });
  }
}
