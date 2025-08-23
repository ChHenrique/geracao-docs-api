import cripto, { createCipheriv } from 'node:crypto';
import { algorithm, key } from './encryptCPF';

export function encryptCNPJ(cpf: string) {
  const iv = cripto.randomBytes(16);

  const chiper = createCipheriv(algorithm, key, iv);
  let encrypter = chiper.update(cpf);

  encrypter = Buffer.concat([encrypter, chiper.final()]);
  return iv.toString('hex') + ':' + encrypter.toString('hex');
}
