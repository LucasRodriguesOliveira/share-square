import { Provider } from '@nestjs/common';

export class UseCaseProxy {
  constructor(
    private readonly token: symbol,
    private readonly provider: Provider,
  ) {}

  get Token() {
    return this.token;
  }

  get Provider() {
    return this.provider;
  }

  get Entry(): [symbol, Provider] {
    return [this.token, this.provider];
  }
}
