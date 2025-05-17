import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseDefinitions } from './mongoose/definition/mongoose.definitions';

@Module({
  imports: [MongooseModule.forFeature(mongooseDefinitions)],
})
export class DatabaseModule {}
