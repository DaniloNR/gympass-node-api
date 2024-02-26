import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { expect, describe, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Register Use Case", () => {
  it("should be able to register a user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
