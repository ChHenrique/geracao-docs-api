import cripto, { createCipheriv } from 'node:crypto';
import { env } from 'src/config/dotenv.config';

export const algorithm = 'aes-256-cbc';
export const key = Buffer.from(env.AES_KEY, 'hex');

export function encryptCPF(cpf: string) {
  const iv = cripto.randomBytes(16);

  const chiper = createCipheriv(algorithm, key, iv);
  let encrypter = chiper.update(cpf);

  encrypter = Buffer.concat([encrypter, chiper.final()]);
  return iv.toString('hex') + ':' + encrypter.toString('hex');
}
