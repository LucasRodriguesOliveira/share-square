import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mb } from '../../../application/constants/byte.size';
import { CreatePassengerProxy } from '../../../infrastructure/usecase-proxy/passenger/create-passenger.proxy';
import { CreatePassengerUseCase } from '../../../application/usecase/passenger/create-passenger.usecase';
import { FindPassengerProxy } from '../../../infrastructure/usecase-proxy/passenger/find-passenger.proxy';
import { FindPassengerUseCase } from '../../../application/usecase/passenger/find-passenger.usecase';
import { CreatePassengerReadstreamProxy } from '../../../infrastructure/usecase-proxy/passenger/create-passenger-readstream.proxy';
import { CreatePassengerReadstreamUseCase } from '../../../application/usecase/passenger/create-passenger-readstream.usecase';
import { PassengerModel } from '../../../domain/model/passenger.model';

@Controller('passenger')
export class PassengerController {
  private readonly logger = new Logger(PassengerController.name);

  constructor(
    @Inject(CreatePassengerProxy.Token)
    private readonly createPassenger: CreatePassengerUseCase,
    @Inject(FindPassengerProxy.Token)
    private readonly findPassenger: FindPassengerUseCase,
    @Inject(CreatePassengerReadstreamProxy.Token)
    private readonly createPassengerReadStream: CreatePassengerReadstreamUseCase,
  ) {}

  @Post(':squareId')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Param('squareId') squareId: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 500 * mb })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const { filename, mimetype, originalname, path } = file;

    const result = await this.createPassenger.run({
      filename,
      mimetype,
      originalname,
      path,
      squareId,
    });

    this.logger.log(
      `[${squareId}]: new file [${originalname}] as ${result} shared`,
    );

    return result;
  }

  @Get(':passengerId')
  public async find(
    @Param('passengerId') passengerId: string,
  ): Promise<PassengerModel> {
    const passenger = await this.findPassenger.byId(passengerId);

    if (!passenger) {
      throw new NotFoundException('Passenger Not found');
    }

    return passenger;
  }

  @Get(':otp/download')
  public async getFile(@Param('otp') otp: string): Promise<StreamableFile> {
    const passenger = await this.findPassenger.byOTP(otp);
    const fileReadStream = await this.createPassengerReadStream.run(passenger);

    this.logger.log(
      `file retrived [${passenger._id}](${passenger.originalname})`,
    );

    return new StreamableFile(fileReadStream);
  }
}
