import { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async authenticate({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (user === null) throw new InvalidCredentialsError();

    const doesPasswordMatches = await compare(password, user.password_hash);
    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return {
      user,
    };
  }
}
