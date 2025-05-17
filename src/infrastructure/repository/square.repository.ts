import { InjectModel } from '@nestjs/mongoose';
import { ISquareRepository } from '../../domain/repository/square-repository.interface';
import { Square } from '../database/mongoose/schema/square.schema';
import { Model } from 'mongoose';
import { SquareModel } from '../../domain/model/square.model';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

export class SquareRepository implements ISquareRepository {
  constructor(
    @InjectModel(Square.name)
    private readonly squareModel: Model<Square>,
  ) {}

  public async create(squareData: Partial<SquareModel>): Promise<SquareModel> {
    const squareCreated = await this.squareModel.create(squareData);

    return plainToInstance(SquareModel, squareCreated.toObject());
  }

  public async findById(squareId: string): Promise<SquareModel> {
    const square = await this.squareModel.findById(squareId).exec();

    if (!square) {
      throw new NotFoundException('Square Not found');
    }

    return plainToInstance(SquareModel, square.toObject());
  }

  public async findByGuildId(guildId: string): Promise<SquareModel | null> {
    const square = await this.squareModel.findOne({ guildId }).exec();

    if (!square) {
      return null;
    }

    return plainToInstance(SquareModel, square.toObject());
  }

  public async setOTP(squareId: string, otp: string): Promise<SquareModel> {
    const square = await this.squareModel.findOneAndUpdate(
      { _id: squareId },
      { $set: { otp } },
    );

    return plainToInstance(SquareModel, square.toObject());
  }
}
