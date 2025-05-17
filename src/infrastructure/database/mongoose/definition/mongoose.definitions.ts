import { ModelDefinition } from '@nestjs/mongoose';
import { passengerDefinition } from './passenger.definition';
import { squareDefinition } from './square.defintion';

export const mongooseDefinitions: ModelDefinition[] = [
  passengerDefinition,
  squareDefinition,
];
