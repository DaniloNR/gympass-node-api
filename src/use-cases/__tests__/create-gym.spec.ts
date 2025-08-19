import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "@/use-cases/create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase; // sut = system under test

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Js Gym",
      description: null,
      phone: null,
      latitude: 43.718371,
      longitude: -79.5428637,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
