import { ICacheService } from '../../../domain/service/cache.interace';
import { RedisService } from '../../redis/redis.service';

export class CacheService implements ICacheService {
  constructor(
    private readonly cacheService: RedisService,
    private readonly prefix: string,
  ) {}

  private Key(key: string): string {
    return `${this.prefix}/${key}`;
  }

  get(key: string): Promise<string | null> {
    return this.cacheService.get(this.Key(key));
  }

  store(key: string, value: string, ttl?: number): Promise<void> {
    return this.cacheService.store(this.Key(key), value, ttl);
  }

  remove(key: string): Promise<boolean> {
    return this.cacheService.remove(key);
  }
}
