import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { RedisModule } from '../redis/redis.module';
import { CacheProviders } from './cache/cache.providers';
import { ConfigProviders } from './config/config.providers';

@Module({
  imports: [RedisModule],
  providers: [CryptoService, ...ConfigProviders, ...CacheProviders],
  exports: [CryptoService, ...ConfigProviders, ...CacheProviders],
})
export class ServiceModule {}
