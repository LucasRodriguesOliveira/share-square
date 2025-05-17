import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { CacheService } from './cache.service';
import { CachePrefix } from '../../../application/constants/cache.prefix';
import { SquareConfigService } from '../config/square-config.service';

@Injectable()
export class SquareCacheService extends CacheService {
  constructor(
    private readonly configService: SquareConfigService,
    cacheService: RedisService,
  ) {
    super(cacheService, CachePrefix.SQUARE);
  }

  store(key: string, value: string): Promise<void> {
    const ttl = this.configService.getTTL();

    return super.store(key, value, ttl);
  }
}
