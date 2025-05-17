import { PassengerModel } from '../../../domain/model/passenger.model';
import { IPassengerRepository } from '../../../domain/repository/passenger-repository.interface';
import { ICacheService } from '../../../domain/service/cache.interace';
import { GeneratorUseCase } from '../otp/generator.usecase';
import { FindPassengerUseCase } from './find-passenger.usecase';

export class CreatePassengerUseCase {
  constructor(
    private readonly cacheService: ICacheService,
    private readonly repository: IPassengerRepository,
    private readonly otpGenerator: GeneratorUseCase,
    private readonly findPassenger: FindPassengerUseCase,
  ) {}

  public async run(passengerData: Partial<PassengerModel>): Promise<string> {
    let isOTPInUse = false;
    let key: string;

    // if otp is already in use, just make another
    do {
      key = this.otpGenerator.getOTP().toString();

      isOTPInUse = await this.otpExists(key);
    } while (isOTPInUse);

    passengerData.otp = key;
    const passenger = await this.repository.create(passengerData);

    await this.cacheService.store(key, passenger._id);

    return key;
  }

  private async otpExists(otp: string): Promise<boolean> {
    const passenger = await this.findPassenger.byOTP(otp);

    return !!passenger;
  }
}
