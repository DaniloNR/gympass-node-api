import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use.case";
import { FastifyRequest as Req, FastifyReply as Rep } from "fastify";

export async function profile(request: Req, reply: Rep): Promise<Rep> {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
  });
}
