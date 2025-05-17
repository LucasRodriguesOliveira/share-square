import { Provider } from '@nestjs/common';
import { CreateSquareOTPUseCase } from '../../../application/usecase/square/create-square-otp.usecase';
import { SquareGeneratorProxy } from '../otp/square-generator.proxy';
import { GeneratorUseCase } from '../../../application/usecase/otp/generator.usecase';
import { SquareCacheService } from '../../service/cache/square-cache.service';
import { ICacheService } from '../../../domain/service/cache.interace';
import { SquareRepository } from '../../repository/square.repository';
import { ISquareRepository } from '../../../domain/repository/square-repository.interface';
import { UseCaseProxy } from '..';

const token = Symbol('__CREATE_SQUARE_OTP_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [SquareGeneratorProxy.Token, SquareCacheService, SquareRepository],
  useFactory: (
    generator: GeneratorUseCase,
    cacheService: ICacheService,
    repository: ISquareRepository,
  ) => new CreateSquareOTPUseCase(generator, cacheService, repository),
};

export const CreateSquareOTPProxy = new UseCaseProxy(token, provider);
