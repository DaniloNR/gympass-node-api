import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { authenticate } from "@/http/controllers/authenticate";

export async function AppRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/session", authenticate);
}
