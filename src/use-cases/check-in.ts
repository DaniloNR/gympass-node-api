import type { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "@/use-cases/errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "@/use-cases/errors/max-distance-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId: user_id,
    gymId: gym_id,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gym_id);
    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KMS = 0.1;

    if (distance > MAX_DISTANCE_IN_KMS) throw new MaxDistanceError();

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      user_id,
      new Date()
    );

    if (checkInOnSameDay) throw new MaxNumberOfCheckInsError();

    const checkIn = await this.checkInsRepository.create({ user_id, gym_id });

    return {
      checkIn,
    };
  }
}
