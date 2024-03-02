import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";
import { register } from "@/http/controllers/users/register";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/session", authenticate);

  // auth routes
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
