import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResourceConfigService } from './resource-config.service';

@Injectable()
export class SquareConfigService extends ResourceConfigService {
  constructor(configService: ConfigService) {
    super('square', configService);
  }
}
