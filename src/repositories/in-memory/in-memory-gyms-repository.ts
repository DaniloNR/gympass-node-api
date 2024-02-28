import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => (item.id = id));

    return gym || null;
  }

  async searchMany(query: string, page: number) {
    const ITEMS_PER_PAGE = 20;
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(String(data.latitude)),
      longitude: new Decimal(String(data.longitude)),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
