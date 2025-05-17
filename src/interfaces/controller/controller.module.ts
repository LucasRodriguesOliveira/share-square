import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';
import { PassengerController } from './passenger/passenger.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../../infrastructure/config/multer/multer.config';
import { SquareController } from './square/square.controller';

@Module({
  imports: [
    UseCaseProxyModule.register(),
    MulterModule.registerAsync(multerConfig),
  ],
  controllers: [PassengerController, SquareController],
})
export class ControllerModule {}
