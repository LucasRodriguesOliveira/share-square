import { Injectable } from '@nestjs/common';
import { ResourceConfigService } from './resource-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PassengerConfigService extends ResourceConfigService {
  constructor(configService: ConfigService) {
    super('passenger', configService);
  }
}
