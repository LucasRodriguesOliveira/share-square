import { ConfigModuleOptions } from '@nestjs/config';
import { envSchema } from './env.schema';
import { mongodbEnv } from './mongodb.env';
import { redisEnv } from './redis.env';
import { appEnv } from './app.config';
import { discordEnv } from './discord.env';

export const envConfig: ConfigModuleOptions = {
  load: [mongodbEnv, redisEnv, appEnv, discordEnv],
  validationSchema: envSchema,
  isGlobal: true,
};
