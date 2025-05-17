import { Provider } from '@nestjs/common';
import { PassengerConfigService } from './passenger-config.service';
import { SquareConfigService } from './square-config.service';

export const ConfigProviders: Provider[] = [
  PassengerConfigService,
  SquareConfigService,
];
