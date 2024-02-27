import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}
