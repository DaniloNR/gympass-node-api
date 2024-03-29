import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "@/use-cases/check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase; // sut = system under test

describe("Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      title: "Js Gym",
      description: null,
      phone: null,
      latitude: 43.718371,
      longitude: -79.5428637,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 43.718371,
      userLongitude: -79.5428637,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice on same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 43.718371,
      userLongitude: -79.5428637,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: 43.718371,
        userLongitude: -79.5428637,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in on different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 43.718371,
      userLongitude: -79.5428637,
    });

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 43.718371,
      userLongitude: -79.5428637,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(43.718371),
      longitude: new Decimal(-79.5428637),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
