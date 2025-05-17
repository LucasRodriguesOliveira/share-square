import { join } from 'node:path';
import { MulterModuleAsyncOptions } from '@nestjs/platform-express';
import { mb } from '../../../application/constants/byte.size';
import { BASE_UPLOAD_PATH } from '../../../application/constants/file.path';

export const multerConfig: MulterModuleAsyncOptions = {
  useFactory: () => {
    return {
      dest: join(__dirname, BASE_UPLOAD_PATH),
      limits: { fileSize: 500 * mb },
    };
  },
};
