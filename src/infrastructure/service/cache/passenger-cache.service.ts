import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { PassengerConfigService } from '../config/passenger-config.service';
import { CachePrefix } from '../../../application/constants/cache.prefix';
import { CacheService } from './cache.service';

@Injectable()
export class PassengerCacheService extends CacheService {
  constructor(
    private readonly configService: PassengerConfigService,
    cacheService: RedisService,
  ) {
    super(cacheService, CachePrefix.PASSENGER);
  }

  store(key: string, value: string): Promise<void> {
    const ttl = this.configService.getTTL();

    return super.store(key, value, ttl);
  }
}
