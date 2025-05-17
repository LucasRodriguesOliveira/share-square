import { Provider } from '@nestjs/common';
import { CreatePassengerReadstreamUseCase } from '../../../application/usecase/passenger/create-passenger-readstream.usecase';
import { UseCaseProxy } from '..';

const token = Symbol('__CREATE_PASSENGER_READSTREAM_USE_CASE__');
const provider: Provider = {
  provide: token,
  useFactory: () => new CreatePassengerReadstreamUseCase(),
};

export const CreatePassengerReadstreamProxy = new UseCaseProxy(token, provider);
