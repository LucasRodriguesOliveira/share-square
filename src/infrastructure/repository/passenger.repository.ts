import { InjectModel } from '@nestjs/mongoose';
import { PassengerModel } from '../../domain/model/passenger.model';
import { IPassengerRepository } from '../../domain/repository/passenger-repository.interface';
import { Passenger } from '../database/mongoose/schema/passenger.schema';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';

export class PassengerRepository implements IPassengerRepository {
  constructor(
    @InjectModel(Passenger.name)
    private readonly passengerModel: Model<Passenger>,
  ) {}

  public async create(passengerData: PassengerModel): Promise<PassengerModel> {
    const passengerCreated = await this.passengerModel.create(passengerData);

    return plainToInstance(PassengerModel, passengerCreated.toObject());
  }

  public async find(passengerId: string): Promise<PassengerModel> {
    const passengerFound = await this.passengerModel
      .findById(passengerId)
      .exec();

    return plainToInstance(PassengerModel, passengerFound.toObject());
  }

  public async list(squareId: string): Promise<PassengerModel[]> {
    const passengers = await this.passengerModel
      .find({
        deletedAt: null,
        squareId,
      })
      .exec();

    return plainToInstance(
      PassengerModel,
      passengers.map((passenger) => JSON.parse(JSON.stringify(passenger))),
    );
  }
}
