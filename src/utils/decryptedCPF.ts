import { createDecipheriv } from 'node:crypto';
import { algorithm, iv, key } from './encryptCPF';

export function decryptCPF(encrypted: string) {
  const [ivHex, encrypterHex] = encrypted.split(':');

  const encryptedText = Buffer.from(encrypterHex, 'hex');

  const dechiper = createDecipheriv(algorithm, key, iv);
  let decrypted = dechiper.update(encryptedText);

  decrypted = Buffer.concat([decrypted, dechiper.final()]);

  return decrypted.toString('utf8');
}
