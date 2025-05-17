import { Provider } from '@nestjs/common';
import { FindSquareProxy } from './find-square.proxy';
import { CreateSquareProxy } from './create-square.proxy';
import { CreateSquareOTPProxy } from './create-square-otp.proxy';

export const SquareProxies: Map<symbol, Provider> = new Map([
  FindSquareProxy.Entry,
  CreateSquareProxy.Entry,
  CreateSquareOTPProxy.Entry,
]);
