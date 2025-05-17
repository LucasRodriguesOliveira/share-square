import { IResourceConfigService } from '../../../domain/service/resource-config.interface';
import { AppConfig, AppResource } from '../../config/types/app.interface';
import { ConfigService } from '@nestjs/config';
import { ResourceConfig } from '../../config/types/resource.interface';
import { APP_ENV_TOKEN } from '../../config/env/app.config';

export class ResourceConfigService implements IResourceConfigService {
  private readonly config: ResourceConfig;

  constructor(
    private readonly resource: AppResource,
    private readonly configService: ConfigService,
  ) {
    const { resources } = this.configService.getOrThrow<AppConfig>(
      APP_ENV_TOKEN.description!,
    );

    this.config = resources[this.resource];
  }

  getOTPLength(): number {
    return this.config.otpLength;
  }

  getTTL(): number {
    return this.config.ttl;
  }
}
