import { hashSync } from "bcryptjs";
import { IUser } from "../models/User";
import { Role } from "../utils/types";
import { Builder } from ".";

type PartialIUserWithRequiredId = { id: IUser["id"] } & Partial<
  Omit<IUser, "id">
>;
export class User {
  public readonly id: string;
  public readonly userId?: string;
  public readonly name?: string;
  public readonly email?: string;
  public readonly password?: string;
  public readonly role?: Role;
  public readonly coach?: string;
  public readonly googleId?: null | string;

  public constructor(data: PartialIUserWithRequiredId) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.coach = data.coach;
    this.googleId = data.googleId;
  }
}

export class UserBuilder extends Builder<
  typeof User,
  PartialIUserWithRequiredId
> {
  protected readonly properties: PartialIUserWithRequiredId = {
    id: "66203fa2a3465a4a588d12u1",
    userId: "000001",
    googleId: null,
    name: "trainee name",
    email: "trainee@gmail.com",
    password: "$2a$10$qMiI0IyA/BCuHyjgqn/f8.IDjrqn7rMrHoH4LZmYoYdXlhWI8QGiu",
    role: Role.TRAINEE,
    coach: "My coach",
  };

  constructor() {
    super(User);
  }

  public static from(
    properties: Partial<PartialIUserWithRequiredId>
  ): UserBuilder {
    return new UserBuilder().with(properties);
  }

  public with(properties: Partial<IUser>): this {
    let key: keyof IUser;

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

  public withName(name: string): this {
    this.properties.name = name;
    return this;
  }

  public withEmail(email: string): this {
    this.properties.email = email;
    return this;
  }

  public withPassword(password: string): this {
    this.properties.password = hashSync(password, 10);
    return this;
  }

  public withRole(role: Role): this {
    this.properties.role = role;
    return this;
  }

  public withCoach(coach: string): this {
    this.properties.coach = coach;
    return this;
  }

  public build(): PartialIUserWithRequiredId {
    return new User({
      ...this.properties,
    });
  }
}
