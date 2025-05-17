import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
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

  @Get(':userId/:otp')
  public async getFile(
    @Param('userId') userId: string,
    @Param('otp') otp: string,
  ): Promise<StreamableFile> {
    const passenger = await this.findPassenger.byOTP(otp);
    const fileReadStream = await this.createPassengerReadStream.run(passenger);

    this.logger.log(`User [${userId}] retrieved file ${otp}`);

    return new StreamableFile(fileReadStream);
  }
}
