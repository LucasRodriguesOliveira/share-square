import { ICryptoService } from '../../../domain/service/crypto.interface';
import { IResourceConfigService } from '../../../domain/service/resource-config.interface';

export class GeneratorUseCase {
  constructor(
    private readonly resourceConfig: IResourceConfigService,
    private readonly cryptoService: ICryptoService,
  ) {}

  private getRandom(length: number): number {
    return this.cryptoService.randomInt(length);
  }

  public getOTP(): number {
    return this.getRandom(this.resourceConfig.getOTPLength());
  }

  public getTTL(): number {
    return this.getRandom(this.resourceConfig.getTTL());
  }
}
