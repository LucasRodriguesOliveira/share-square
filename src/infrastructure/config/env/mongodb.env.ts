import { MongodbConfig } from '../types/mongodb.interface';

export const MONGODB_TOKEN = Symbol('mongodb');

export const mongodbEnv = (): { mongodb: MongodbConfig } => {
  const { DB_NAME, DB_PASSWORD, DB_USERNAME, DATABASE_URL } = process.env;

  return {
    mongodb: {
      database: DB_NAME,
      password: DB_PASSWORD,
      url: DATABASE_URL,
      user: DB_USERNAME,
    },
  };
};
