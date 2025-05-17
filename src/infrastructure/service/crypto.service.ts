import { Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { ICryptoService } from '../../domain/service/crypto.interface';

@Injectable()
export class CryptoService implements ICryptoService {
  public randomInt(length: number): number {
    const digits: number[] = [];

    for (let i = 0; i < length; i++) {
      digits.push(randomInt(10, 99));
    }

    const half = Math.ceil(length / 2);
    const startIndex = randomInt(0, half);
    const endIndex = startIndex + half;

    const result = digits.slice(startIndex, endIndex).join('').slice(0, length);

    return parseInt(result, 10);
  }
}
