import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: Prisma.UserCreateInput["email"]): Promise<User | null>;
}
