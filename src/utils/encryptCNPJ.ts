import cripto, { createCipheriv } from 'node:crypto';
import { algorithm, iv, key } from './encryptCPF';
import { BadRequestException } from '@nestjs/common';

export function encryptCNPJ(cnpj: string) {
  if (!cnpj) throw new BadRequestException('CNPJ cannot be undefined');

  const chiper = createCipheriv(algorithm, key, iv);
  let encrypter = chiper.update(cnpj);

  encrypter = Buffer.concat([encrypter, chiper.final()]);
  return iv.toString('hex') + ':' + encrypter.toString('hex');
}
