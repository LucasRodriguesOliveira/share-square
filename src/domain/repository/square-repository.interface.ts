import { SquareModel } from '../model/square.model';

export interface ISquareRepository {
  create(squareData: Partial<SquareModel>): Promise<SquareModel>;
  findById(squareId: string): Promise<SquareModel>;
  findByGuildId(guildId: string): Promise<SquareModel | null>;
  setOTP(squareId: string, otp: string): Promise<SquareModel>;
}
