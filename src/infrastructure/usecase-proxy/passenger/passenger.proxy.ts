import { Provider } from '@nestjs/common';
import { CreatePassengerProxy } from './create-passenger.proxy';
import { FindPassengerProxy } from './find-passenger.proxy';
import { ListPassengerProxy } from './list-passenger.proxy';
import { CreatePassengerReadstreamProxy } from './create-passenger-readstream.proxy';

export const PassengerProxies: Map<symbol, Provider> = new Map([
  CreatePassengerProxy.Entry,
  FindPassengerProxy.Entry,
  ListPassengerProxy.Entry,
  CreatePassengerReadstreamProxy.Entry,
]);
