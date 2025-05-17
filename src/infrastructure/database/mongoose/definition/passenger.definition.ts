import { ModelDefinition } from '@nestjs/mongoose';
import { Passenger, PassengerSchema } from '../schema/passenger.schema';

export const passengerDefinition: ModelDefinition = {
  name: Passenger.name,
  schema: PassengerSchema,
};
