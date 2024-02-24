import { register } from "@/http/controllers/register";
import { FastifyInstance } from "fastify";

export async function AppRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
