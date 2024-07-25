import { IQuestion } from "../models/Question";

export class Question {
  public readonly _id: string;
  public readonly title?: string;
  public readonly type?: "text" | "dropdown";
  public readonly options?: string[];
  public readonly responseIds?: string[];

  public constructor(data: Partial<IQuestion>) {
    this._id = data._id;
    this.title = data.title;
    this.type = data.type;
    this.options = data.options;
    this.responseIds = data.responseIds;
  }
}

export class QuestionBuilder {
  private readonly properties: Partial<IQuestion> = {
    _id: "66203fa2a3465a4a588d12q1",
    title: "Test question",
    type: "text",
    options: [],
    responseIds: [],
  };

  public static from(properties: Partial<IQuestion>): QuestionBuilder {
    return new QuestionBuilder().with(properties);
  }

  public with(properties: Partial<IQuestion>): this {
    let key: keyof IQuestion;

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

  public withType(type: "text" | "dropdown"): this {
    this.properties.type = type;
    return this;
  }

  public withOptions(options: string[]): this {
    this.properties.options = options;
    return this;
  }

  public withResponseIds(responseIds: string[]): this {
    this.properties.responseIds = responseIds;
    return this;
  }

  public build(): Partial<IQuestion> {
    return new Question({
      ...this.properties,
    });
  }
}
