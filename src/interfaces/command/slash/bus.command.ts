import { Inject, Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { ListPassengerProxy } from '../../../infrastructure/usecase-proxy/passenger/list-passenger.proxy';
import { ListPassengerUseCase } from '../../../application/usecase/passenger/list-passenger.usecase';
import {
  Emoji,
  EmojiMap,
} from '../../../application/constants/emojis.unicodes';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../infrastructure/config/types/app.interface';
import { APP_ENV_TOKEN } from '../../../infrastructure/config/env/app.config';
import { FindSquareProxy } from '../../../infrastructure/usecase-proxy/square/find-square.proxy';
import { FindSquareUseCase } from '../../../application/usecase/square/find-square.usecase';

@Injectable()
export class BusCommand {
  constructor(
    @Inject(ListPassengerProxy.Token)
    private readonly listPassenger: ListPassengerUseCase,
    @Inject(FindSquareProxy.Token)
    private readonly findSquare: FindSquareUseCase,
    private readonly configService: ConfigService,
  ) {}

  @SlashCommand({
    name: 'bus',
    description: 'Shows a list of files uploaded',
  })
  public async onSlashBus(@Context() [interaction]: SlashCommandContext) {
    const square = await this.findSquare.byGuildId(interaction.guildId);
    const bus = await this.listPassenger.run(square._id);

    if (bus.length === 0) {
      return interaction.reply({
        content: 'There are no buses running around.',
      });
    }

    const { host } = this.configService.getOrThrow<AppConfig>(
      APP_ENV_TOKEN.description!,
    );
    const downloadLink = `${host}/square/${square._id}/:id`;

    const items = bus.map((passenger) => {
      const emoji: string = this.getEmoji(passenger.mimetype);
      const link = downloadLink.replace(':id', passenger.otp);

      return `${emoji} [${passenger.originalname}](${link})`;
    });

    return interaction.reply({
      content: `Bus passengers for this Square:\n\n${items.join('\n')}`,
    });
  }

  private getEmoji(mimetype: string): string {
    const [type] = mimetype.split('/');

    if (EmojiMap.has(type)) {
      return EmojiMap.get(type);
    }

    return Emoji.unknown;
  }
}
