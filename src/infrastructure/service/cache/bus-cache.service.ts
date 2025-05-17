import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisService } from '../../redis/redis.service';
import { CachePrefix } from '../../../application/constants/cache.prefix';

@Injectable()
export class BusCacheService extends CacheService {
  constructor(cacheService: RedisService) {
    super(cacheService, CachePrefix.BUS);
  }
}
