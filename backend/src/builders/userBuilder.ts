import { hashSync } from "bcryptjs";
import { IUser } from "../models/User";
import { Role } from "../utils/types";

export class User {
  public readonly _id: string;
  public readonly name?: string;
  public readonly email?: string;
  public readonly password?: string;
  public readonly role?: Role;
  public readonly coach?: string;

  public constructor(data: Partial<IUser>) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.coach = data.coach;
  }
}

export class UserBuilder {
  private readonly properties: Partial<IUser> = {
    _id: "66203fa2a3465a4a588d12u1",
    name: "trainee name",
    email: "trainee@gmail.com",
    password: " $2a$10$qMiI0IyA/BCuHyjgqn/f8.IDjrqn7rMrHoH4LZmYoYdXlhWI8QGiu",
    role: Role.TRAINEE,
    coach: "My coach",
  };

  public static from(properties: Partial<IUser>): UserBuilder {
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

  public withId(_id: string): this {
    this.properties._id = _id;
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

  public build(): Partial<IUser> {
    return new User({
      ...this.properties,
    });
  }
}
