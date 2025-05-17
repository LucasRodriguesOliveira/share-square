import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './infrastructure/config/types/app.interface';
import { APP_ENV_TOKEN } from './infrastructure/config/env/app.config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  const configService = app.get<ConfigService>(ConfigService);

  const { port } = configService.getOrThrow<AppConfig>(
    APP_ENV_TOKEN.description!,
  );

  app.use(helmet());

  await app.listen(port);
}
bootstrap();
