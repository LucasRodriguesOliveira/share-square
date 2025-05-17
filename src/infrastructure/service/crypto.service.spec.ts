import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    cryptoService = app.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(cryptoService).toBeDefined();
  });

  describe('randomInt', () => {
    it('should return 100 random integer with random sizes', () => {
      const results: { result: number; length: number }[] = [];
      const MAX_SIZE = 100;
      let size = 0;

      while (size < MAX_SIZE) {
        const length = Math.round(Math.random() * 10) + 5;
        const result = cryptoService.randomInt(length);

        results.push({
          result,
          length,
        });

        size++;
      }

      results.forEach((item) => {
        expect(`${item.result}`).toHaveLength(item.length);
      });
    });
  });
});
