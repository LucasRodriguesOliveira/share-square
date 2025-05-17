import { DiscordEnvConfig } from '../types/discord.interface';

export const DISCORD_CONFIG_TOKEN = Symbol('discord');

export const discordEnv = (): { discord: DiscordEnvConfig } => {
  const {
    DISCORD_APP_ID,
    DISCORD_TOKEN,
    DISCORD_PUBLIC_KEY,
    DISCORD_DEVELOPMENT_GUILD_ID,
  } = process.env;

  return {
    discord: {
      appId: DISCORD_APP_ID,
      token: DISCORD_TOKEN,
      developmentGuildId: DISCORD_DEVELOPMENT_GUILD_ID,
      publicKey: DISCORD_PUBLIC_KEY,
    },
  };
};
