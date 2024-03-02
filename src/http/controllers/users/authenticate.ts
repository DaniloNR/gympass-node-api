import { z } from "zod";
import { FastifyRequest as Req, FastifyReply as Rep } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(request: Req, reply: Rep): Promise<Rep> {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = registerBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    switch (true) {
      case error instanceof InvalidCredentialsError:
        return reply.status(400).send({ message: error.message });
      default:
        throw error;
    }
  }
}
