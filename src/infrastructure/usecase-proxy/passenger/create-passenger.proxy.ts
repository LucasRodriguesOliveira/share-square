import { Provider } from '@nestjs/common';
import { PassengerCacheService } from '../../service/cache/passenger-cache.service';
import { PassengerRepository } from '../../repository/passenger.repository';
import { ICacheService } from '../../../domain/service/cache.interace';
import { IPassengerRepository } from '../../../domain/repository/passenger-repository.interface';
import { CreatePassengerUseCase } from '../../../application/usecase/passenger/create-passenger.usecase';
import { PassengerGeneratorProxy } from '../otp/passenger-generator.proxy';
import { GeneratorUseCase } from '../../../application/usecase/otp/generator.usecase';
import { UseCaseProxy } from '..';
import { FindPassengerProxy } from './find-passenger.proxy';
import { FindPassengerUseCase } from '../../../application/usecase/passenger/find-passenger.usecase';

const token = Symbol('__CREATE_PASSENGER_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [
    PassengerCacheService,
    PassengerRepository,
    PassengerGeneratorProxy.Token,
    FindPassengerProxy.Token,
  ],
  useFactory: (
    cacheService: ICacheService,
    repository: IPassengerRepository,
    generatorUseCase: GeneratorUseCase,
    findPassengerUseCase: FindPassengerUseCase,
  ) =>
    new CreatePassengerUseCase(
      cacheService,
      repository,
      generatorUseCase,
      findPassengerUseCase,
    ),
};

export const CreatePassengerProxy = new UseCaseProxy(token, provider);
