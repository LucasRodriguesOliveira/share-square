import { Provider } from '@nestjs/common';
import { SquareRepository } from '../../repository/square.repository';
import { FindSquareProxy } from './find-square.proxy';
import { ISquareRepository } from '../../../domain/repository/square-repository.interface';
import { FindSquareUseCase } from '../../../application/usecase/square/find-square.usecase';
import { CreateSquareUseCase } from '../../../application/usecase/square/create-square.usecase';
import { UseCaseProxy } from '..';
import { GeneratorUseCase } from '../../../application/usecase/otp/generator.usecase';
import { PassengerGeneratorProxy } from '../otp/passenger-generator.proxy';

const token = Symbol('__CREATE_SQUARE_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [
    SquareRepository,
    FindSquareProxy.Token,
    PassengerGeneratorProxy.Token,
  ],
  useFactory: (
    repository: ISquareRepository,
    findSquare: FindSquareUseCase,
    generator: GeneratorUseCase,
  ) => new CreateSquareUseCase(findSquare, repository, generator),
};

export const CreateSquareProxy = new UseCaseProxy(token, provider);
