import { Provider } from '@nestjs/common';
import { CryptoService } from '../../service/crypto.service';
import { IResourceConfigService } from '../../../domain/service/resource-config.interface';
import { ICryptoService } from '../../../domain/service/crypto.interface';
import { GeneratorUseCase } from '../../../application/usecase/otp/generator.usecase';
import { UseCaseProxy } from '..';
import { SquareConfigService } from '../../service/config/square-config.service';

const token = Symbol('__OTP_SQUARE_GENERATOR_USE_CASE__');
const provider: Provider = {
  provide: token,
  inject: [SquareConfigService, CryptoService],
  useFactory: (
    configService: IResourceConfigService,
    cryptoService: ICryptoService,
  ) => new GeneratorUseCase(configService, cryptoService),
};

export const SquareGeneratorProxy = new UseCaseProxy(token, provider);
