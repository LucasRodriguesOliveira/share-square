import * as joi from 'joi';

export const envSchema = joi.object({
  REDIS_PORT: joi.string().required(),
  REDIS_HOST: joi.string().required(),
  REDIS_TTL: joi.string().required(),
  DB_PORT: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DATABASE_URL: joi.string().required(),
  PORT: joi.string().required(),
  HOST: joi.string().required(),
  DISCORD_APP_ID: joi.string().required(),
  DISCORD_TOKEN: joi.string().required(),
  DISCORD_PUBLIC_KEY: joi.string().required(),
  DISCORD_DEVELOPMENT_GUILD_ID: joi.string().required(),
});
