import { Provider } from '@nestjs/common';
import { CryptoService } from '../../service/crypto.service';
import { IResourceConfigService } from '../../../domain/service/resource-config.interface';
import { ICryptoService } from '../../../domain/service/crypto.interface';
import { GeneratorUseCase } from '../../../application/usecase/otp/generator.usecase';
import { UseCaseProxy } from '..';
import { PassengerConfigService } from '../../service/config/passenger-config.service';

const token = Symbol('__OTP_PASSENGER_GENERATOR_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [PassengerConfigService, CryptoService],
  useFactory: (
    configService: IResourceConfigService,
    cryptoService: ICryptoService,
  ) => new GeneratorUseCase(configService, cryptoService),
};

export const PassengerGeneratorProxy = new UseCaseProxy(token, provider);
