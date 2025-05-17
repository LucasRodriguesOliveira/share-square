import { Provider } from '@nestjs/common';
import { PassengerCacheService } from '../../service/cache/passenger-cache.service';
import { PassengerRepository } from '../../repository/passenger.repository';
import { ICacheService } from '../../../domain/service/cache.interace';
import { IPassengerRepository } from '../../../domain/repository/passenger-repository.interface';
import { ListPassengerUseCase } from '../../../application/usecase/passenger/list-passenger.usecase';
import { UseCaseProxy } from '..';

const token = Symbol('__LIST_PASSENGER_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [PassengerCacheService, PassengerRepository],
  useFactory: (cacheService: ICacheService, repository: IPassengerRepository) =>
    new ListPassengerUseCase(cacheService, repository),
};

export const ListPassengerProxy = new UseCaseProxy(token, provider);
