import { PassengerModel } from '../../../domain/model/passenger.model';
import { IPassengerRepository } from '../../../domain/repository/passenger-repository.interface';
import { ICacheService } from '../../../domain/service/cache.interace';

export class ListPassengerUseCase {
  constructor(
    private readonly cacheService: ICacheService,
    private readonly repository: IPassengerRepository,
  ) {}

  public async run(squareId: string): Promise<PassengerModel[]> {
    const passengers = await this.repository.list(squareId);

    const idList: string[] = [];

    for await (const id of this.getIdsInCache(passengers)) {
      idList.push(id);
    }

    console.log(ListPassengerUseCase.name, { passengers, idList });

    const filteredIdList = idList.filter((id) => !!id);

    if (filteredIdList.length === passengers.length) {
      return passengers;
    }

    return passengers.filter((passenger) =>
      filteredIdList.includes(passenger._id),
    );
  }

  private async *getIdsInCache(passengers: PassengerModel[]) {
    const passengersCount = passengers.length;
    for (let i = 0; i < passengersCount; i++) {
      yield this.cacheService.get(passengers[i].otp);
    }
  }
}
