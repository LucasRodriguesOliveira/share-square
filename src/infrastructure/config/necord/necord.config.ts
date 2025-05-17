import { ConfigurableModuleAsyncOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NecordModuleOptions } from 'necord';
import { DiscordEnvConfig } from '../types/discord.interface';
import { DISCORD_CONFIG_TOKEN } from '../env/discord.env';
import { IntentsBitField } from 'discord.js';

export const necordConfig: ConfigurableModuleAsyncOptions<
  NecordModuleOptions,
  'createNecordOptions'
> = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { token, developmentGuildId } =
      configService.getOrThrow<DiscordEnvConfig>(
        DISCORD_CONFIG_TOKEN.description!,
      );

    return {
      token,
      intents: [IntentsBitField.Flags.Guilds],
      development: [developmentGuildId],
    };
  },
};
