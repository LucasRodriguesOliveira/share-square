import { Provider } from '@nestjs/common';
import { SquareRepository } from '../../repository/square.repository';
import { ISquareRepository } from '../../../domain/repository/square-repository.interface';
import { FindSquareUseCase } from '../../../application/usecase/square/find-square.usecase';
import { UseCaseProxy } from '..';
import { ICacheService } from '../../../domain/service/cache.interace';
import { SquareCacheService } from '../../service/cache/square-cache.service';

const token = Symbol('__FIND_SQUARE_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [SquareRepository, SquareCacheService],
  useFactory: (repository: ISquareRepository, cacheService: ICacheService) =>
    new FindSquareUseCase(repository, cacheService),
};

export const FindSquareProxy = new UseCaseProxy(token, provider);
