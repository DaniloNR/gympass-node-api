import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: Prisma.UserCreateInput["email"]): Promise<User | null>;
}
