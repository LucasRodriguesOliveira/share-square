import { IPassengerRepository } from '../../../domain/repository/passenger-repository.interface';
import { ICacheService } from '../../../domain/service/cache.interace';
import { PassengerModel } from '../../../domain/model/passenger.model';

export class FindPassengerUseCase {
  constructor(
    private readonly cacheService: ICacheService,
    private readonly repository: IPassengerRepository,
  ) {}

  public async byOTP(key: string): Promise<PassengerModel | null> {
    const passengerId = await this.cacheService.get(key);

    if (!passengerId) {
      return null;
    }

    const passenger = await this.repository.find(passengerId);

    return passenger;
  }

  public async byId(id: string): Promise<PassengerModel | null> {
    return this.repository.find(id);
  }
}
