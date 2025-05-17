import { Provider } from '@nestjs/common';
import { PassengerGeneratorProxy } from './passenger-generator.proxy';
import { SquareGeneratorProxy } from './square-generator.proxy';

export const OTPProxies: Map<symbol, Provider> = new Map([
  PassengerGeneratorProxy.Entry,
  SquareGeneratorProxy.Entry,
]);
