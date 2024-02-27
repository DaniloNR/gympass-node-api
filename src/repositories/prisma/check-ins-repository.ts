import { prisma } from "@/lib/prisma";
import type { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}
