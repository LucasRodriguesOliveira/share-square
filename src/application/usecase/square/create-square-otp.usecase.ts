import { ISquareRepository } from '../../../domain/repository/square-repository.interface';
import { ICacheService } from '../../../domain/service/cache.interace';
import { GeneratorUseCase } from '../otp/generator.usecase';

export class CreateSquareOTPUseCase {
  constructor(
    private readonly otpGenerator: GeneratorUseCase,
    private readonly cacheService: ICacheService,
    private readonly repository: ISquareRepository,
  ) {}

  public async run(squareId: string): Promise<string> {
    const square = await this.repository.findById(squareId);
    const isOTPInUse = await this.otpInUse(square.otp);

    if (isOTPInUse) {
      return square.otp;
    }

    const otp = this.otpGenerator.getOTP().toString();

    await Promise.all([
      this.repository.setOTP(squareId, otp),
      this.cacheService.store(otp, squareId),
    ]);

    return otp;
  }

  private async otpInUse(otp: string): Promise<boolean> {
    const result = await this.cacheService.get(otp);

    return !!result;
  }
}
