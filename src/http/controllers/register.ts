import { z } from "zod";
import { FastifyRequest as Req, FastifyReply as Rep } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: Req, reply: Rep): Promise<Rep> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    switch (true) {
      case error instanceof UserAlreadyExistsError:
        return reply.status(409).send({ message: error.message });
      default:
        throw error;
    }
  }

  return reply.status(201).send();
}
