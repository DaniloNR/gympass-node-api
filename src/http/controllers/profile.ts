import { FastifyRequest as Req, FastifyReply as Rep } from "fastify";

export async function profile(request: Req, reply: Rep): Promise<Rep> {
  await request.jwtVerify();

  return reply.status(200).send();
}
