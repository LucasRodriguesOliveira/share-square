import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisConfig } from '../config/cache/redis.config';
import { RedisService } from './redis.service';

@Module({
  imports: [CacheModule.registerAsync(redisConfig)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
