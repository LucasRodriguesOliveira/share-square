import { ModelDefinition } from '@nestjs/mongoose';
import { Square, SquareSchema } from '../schema/square.schema';

export const squareDefinition: ModelDefinition = {
  name: Square.name,
  schema: SquareSchema,
};
