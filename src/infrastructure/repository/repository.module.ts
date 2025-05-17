import { Module } from '@nestjs/common';
import { PassengerRepository } from './passenger.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseDefinitions } from '../database/mongoose/definition/mongoose.definitions';
import { SquareRepository } from './square.repository';

@Module({
  imports: [MongooseModule.forFeature(mongooseDefinitions)],
  providers: [PassengerRepository, SquareRepository],
  exports: [PassengerRepository, SquareRepository],
})
export class RepositoryModule {}
