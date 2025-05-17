import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { necordConfig } from '../../infrastructure/config/necord/necord.config';
import { BusCommand } from './slash/bus.command';
import { UseCaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';
import { SquareCommand } from './slash/square.command';

@Module({
  imports: [
    NecordModule.forRootAsync(necordConfig),
    UseCaseProxyModule.register(),
  ],
  providers: [BusCommand, SquareCommand],
})
export class CommandModule {}
