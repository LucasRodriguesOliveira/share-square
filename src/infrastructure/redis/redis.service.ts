import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  public async store(key: string, value: string, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  public async get(key: string): Promise<string | null> {
    return this.cacheManager.get(key);
  }

  public async remove(key: string): Promise<boolean> {
    return this.cacheManager.del(key);
  }
}
