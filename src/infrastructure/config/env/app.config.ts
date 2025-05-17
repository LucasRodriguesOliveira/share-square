import {
  ONE_HOUR,
  ONE_MINUTE,
} from '../../../application/constants/milissecond.duration';
import { AppConfig } from '../types/app.interface';
import { EnvMode } from '../types/mode.enum';

export const APP_ENV_TOKEN = Symbol('app');

export const DEFAULT_PORT = '3000';
export const DEFAULT_OTP_LENGTH = 10;
export const DEFAULT_MODE = EnvMode.DEVELOPMENT;

const DEFAULT_NODE_ENV = 'development';

const getOtpLength = (mode: EnvMode): number => {
  if (EnvMode.DEVELOPMENT === mode) {
    return DEFAULT_OTP_LENGTH;
  }

  if (EnvMode.TEST === mode) {
    return 5;
  }

  if (EnvMode.PRODUCTION === mode) {
    // by now, it's the same as default, but i'll keep it so it might change in future
    return 10;
  }

  return DEFAULT_OTP_LENGTH;
};

export const appEnv = (): { app: AppConfig } => {
  const {
    PORT = DEFAULT_PORT,
    HOST,
    NODE_ENV = DEFAULT_NODE_ENV,
  } = process.env;

  let mode: EnvMode;

  switch (NODE_ENV) {
    case 'develop':
    case 'development':
      mode = EnvMode.DEVELOPMENT;
      break;
    case 'prod':
    case 'production':
      mode = EnvMode.PRODUCTION;
      break;
    case 'test':
      mode = EnvMode.TEST;
      break;
  }

  return {
    app: {
      mode,
      port: parseInt(PORT, 10),
      host: HOST,
      resources: {
        passenger: {
          otpLength: getOtpLength(mode),
          ttl: 5 * ONE_MINUTE,
        },
        square: {
          otpLength: 5,
          ttl: ONE_HOUR,
        },
      },
    },
  };
};
