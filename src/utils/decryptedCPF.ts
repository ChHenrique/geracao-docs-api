import { createDecipheriv } from 'node:crypto';
import { algorithm, iv, key } from './encryptCPF';
import { BadRequestException } from '@nestjs/common';

export function decryptCPF(encrypted: string) {
  if (!encrypted) throw new BadRequestException('No CPF provided');
  console.log('encrypted: ', encrypted);
  const [ivHex, encrypterHex] = encrypted.split(':');
  if (!ivHex || !encrypterHex)
    throw new BadRequestException('Invalid encrypted CPF format');

  const encryptedText = Buffer.from(encrypterHex, 'hex');
  const ivBuffer = Buffer.from(ivHex, 'hex'); // <- aqui pegamos o IV do valor criptografado

  const decipher = createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8');
}
