import { SquareModel } from '../../../domain/model/square.model';
import { ISquareRepository } from '../../../domain/repository/square-repository.interface';
import { GeneratorUseCase } from '../otp/generator.usecase';
import { FindSquareUseCase } from './find-square.usecase';

export class CreateSquareUseCase {
  constructor(
    private readonly findSquare: FindSquareUseCase,
    private readonly repository: ISquareRepository,
    private readonly otpGenerator: GeneratorUseCase,
  ) {}

  public async run(
    squareData: Partial<SquareModel>,
    skipCheck: boolean,
  ): Promise<SquareModel> {
    if (!skipCheck) {
      const squareExists = await this.findSquare.byGuildId(squareData.guildId);

      if (!!squareExists) {
        return squareExists;
      }
    }

    squareData.otp = this.otpGenerator.getOTP().toString();

    return this.repository.create(squareData);
  }
}
