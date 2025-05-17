import { DynamicModule, Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { OTPProxies } from './otp/otp.proxy';
import { RepositoryModule } from '../repository/repository.module';
import { PassengerProxies } from './passenger/passenger.proxy';
import { SquareProxies } from './square/square.proxy';

@Module({
  imports: [ServiceModule, RepositoryModule],
})
export class UseCaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        ...OTPProxies.values(),
        ...PassengerProxies.values(),
        ...SquareProxies.values(),
      ],
      exports: [
        ...OTPProxies.keys(),
        ...PassengerProxies.keys(),
        ...SquareProxies.keys(),
      ],
    };
  }
}
