import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MONGODB_TOKEN } from '../env/mongodb.env';
import { MongodbConfig } from '../types/mongodb.interface';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { url, database, password, user } =
      configService.getOrThrow<MongodbConfig>(MONGODB_TOKEN.description!);

    return {
      uri: url,
      dbName: database,
      user,
      pass: password,
      authSource: 'admin',
    };
  },
};
