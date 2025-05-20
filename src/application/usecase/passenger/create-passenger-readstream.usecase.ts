import { ReadStream, createReadStream } from 'node:fs';
import { PassengerModel } from '../../../domain/model/passenger.model';
import { join } from 'node:path';
import { BASE_UPLOAD_PATH } from '../../constants/file.path';

export class CreatePassengerReadstreamUseCase {
  public async run(passenger: PassengerModel): Promise<ReadStream> {
    return createReadStream(
      join(__dirname, BASE_UPLOAD_PATH, passenger.filename),
    );
  }
}
