import { PassengerModel } from '../model/passenger.model';

export interface IPassengerRepository {
  create(passengerData: Partial<PassengerModel>): Promise<PassengerModel>;
  find(passengerId: string): Promise<PassengerModel>;
  list(squareId: string): Promise<PassengerModel[]>;
}
