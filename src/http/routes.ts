import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { authenticate } from "@/http/controllers/authenticate";
import { profile } from "@/http/controllers/profile";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function AppRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/session", authenticate);

  // auth routes
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
