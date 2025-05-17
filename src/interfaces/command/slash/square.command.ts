import { Inject, Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { FindSquareProxy } from '../../../infrastructure/usecase-proxy/square/find-square.proxy';
import { FindSquareUseCase } from '../../../application/usecase/square/find-square.usecase';
import { CreateSquareProxy } from '../../../infrastructure/usecase-proxy/square/create-square.proxy';
import { CreateSquareUseCase } from '../../../application/usecase/square/create-square.usecase';
import { SquareModel } from '../../../domain/model/square.model';
import { CreateSquareOTPProxy } from '../../../infrastructure/usecase-proxy/square/create-square-otp.proxy';
import { CreateSquareOTPUseCase } from '../../../application/usecase/square/create-square-otp.usecase';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../infrastructure/config/types/app.interface';
import { APP_ENV_TOKEN } from '../../../infrastructure/config/env/app.config';

@Injectable()
export class SquareCommand {
  private readonly logger = new Logger(SquareCommand.name);

  constructor(
    @Inject(FindSquareProxy.Token)
    private readonly findSquare: FindSquareUseCase,
    @Inject(CreateSquareProxy.Token)
    private readonly createSquare: CreateSquareUseCase,
    @Inject(CreateSquareOTPProxy.Token)
    private readonly createSquareOTP: CreateSquareOTPUseCase,
    private readonly configService: ConfigService,
  ) {}

  @SlashCommand({
    name: 'square',
    description: 'Get a One Time Password for this square to upload a file',
  })
  public async onSquare(@Context() [interaction]: SlashCommandContext) {
    const guildId = interaction.guildId;

    let square = await this.findSquare.byGuildId(guildId);

    if (!square) {
      const squareData: Partial<SquareModel> = {
        name: interaction.guild.name,
        guildId,
      };

      square = await this.createSquare.run(squareData, true);
      this.logger.log(
        `New Square [${square._id}] created for the guild [${interaction.guild.name}]`,
      );
    }

    const otp = await this.createSquareOTP.run(square._id);
    const { host } = this.configService.getOrThrow<AppConfig>(
      APP_ENV_TOKEN.description!,
    );

    return interaction.reply({
      content:
        `Great. Here a One-Time-Password for you:\n\`${otp}\`\n\n` +
        `Now, go to [ShareSquare](${host}) to find your square`,
    });
  }
}
