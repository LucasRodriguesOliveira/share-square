import { Module } from '@nestjs/common';
import { ControllerModule } from './interfaces/controller/controller.module';
import { UseCaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infrastructure/config/env/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './infrastructure/config/mongoose/mongoose.config';
import { CommandModule } from './interfaces/command/command.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    MongooseModule.forRootAsync(mongooseConfig),
    UseCaseProxyModule.register(),
    ControllerModule,
    DatabaseModule,
    CommandModule,
  ],
})
export class AppModule {}
