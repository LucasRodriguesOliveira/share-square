import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { FindSquareProxy } from '../../../infrastructure/usecase-proxy/square/find-square.proxy';
import { FindSquareUseCase } from '../../../application/usecase/square/find-square.usecase';
import { SquareModel } from '../../../domain/model/square.model';
import { PassengerModel } from '../../../domain/model/passenger.model';
import { ListPassengerProxy } from '../../../infrastructure/usecase-proxy/passenger/list-passenger.proxy';
import { ListPassengerUseCase } from '../../../application/usecase/passenger/list-passenger.usecase';

@Controller('square')
export class SquareController {
  constructor(
    @Inject(FindSquareProxy.Token)
    private readonly findSquare: FindSquareUseCase,
    @Inject(ListPassengerProxy.Token)
    private readonly listPassenger: ListPassengerUseCase,
  ) {}

  @Get(':squareOTP')
  @HttpCode(HttpStatus.OK)
  public async findByOTP(
    @Param('squareOTP') squareOTP: string,
  ): Promise<SquareModel> {
    return this.findSquare.byOTP(squareOTP);
  }

  @Get(':squareId/bus')
  @HttpCode(HttpStatus.OK)
  public async findSquareBus(
    @Param('squareId') squareId: string,
  ): Promise<PassengerModel[]> {
    return this.listPassenger.run(squareId);
  }
}
