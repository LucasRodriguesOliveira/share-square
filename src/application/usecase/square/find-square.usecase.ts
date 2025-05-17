import { SquareModel } from '../../../domain/model/square.model';
import { ISquareRepository } from '../../../domain/repository/square-repository.interface';
import { ICacheService } from '../../../domain/service/cache.interace';

export class FindSquareUseCase {
  constructor(
    private readonly repository: ISquareRepository,
    private readonly cacheService: ICacheService,
  ) {}

  public async byId(squareId: string): Promise<SquareModel> {
    return this.repository.findById(squareId);
  }

  public async byGuildId(guildId: string): Promise<SquareModel | null> {
    return this.repository.findByGuildId(guildId);
  }

  public async byOTP(squareOTP: string): Promise<SquareModel> {
    const squareId = await this.cacheService.get(squareOTP);

    const square = await this.repository.findById(squareId);

    await this.cacheService.remove(squareOTP);

    return square;
  }
}
