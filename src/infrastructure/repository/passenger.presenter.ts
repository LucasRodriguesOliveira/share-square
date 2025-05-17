import { Transform, TransformFnParams } from 'class-transformer';
import { PassengerModel } from '../../domain/model/passenger.model';

export class PassengerPresenter extends PassengerModel {
  @Transform(({ value }: TransformFnParams) => {
    return JSON.stringify(value);
  })
  _id: string;
}
