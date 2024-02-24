import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

// SOLI[D] -> Dependency Inversion Principle
// UsersRepository is not a dependency invoked by this use case Class.
// Now, the one who is instantiating this class will be responsible for it

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async register({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
