import { z } from "zod";
import { FastifyRequest as Req, FastifyReply as Rep } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(request: Req, reply: Rep): Promise<Rep> {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (error) {
    switch (true) {
      case error instanceof InvalidCredentialsError:
        return reply.status(400).send({ message: error.message });
      default:
        throw error;
    }
  }

  return reply.status(200).send();
}
