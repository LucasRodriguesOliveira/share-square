import { Provider } from '@nestjs/common';
import { PassengerCacheService } from './passenger-cache.service';
import { SquareCacheService } from './square-cache.service';

export const CacheProviders: Provider[] = [
  PassengerCacheService,
  SquareCacheService,
];
