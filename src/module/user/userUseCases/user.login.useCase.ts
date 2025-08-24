import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUserRepository } from '../userDomain/user.repository';
import { userSchema, userSchemaLoginDTO } from 'src/schemas/user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { payloadJWT } from 'src/utils/payloadJwt';
import { encryptCPF } from 'src/utils/encryptCPF';
import { encryptCNPJ } from 'src/utils/encryptCNPJ';

@Injectable()
export class UserloginUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(data: userSchemaLoginDTO) {
    let user: any;

    if (data.cpf) {
      const encryptedCPF = encryptCPF(data.cpf);
      user = this.userRepo.getByCPF(encryptedCPF);
    } else if (data.cnpj) {
      const encryptedCNPJ = encryptCNPJ(data.cnpj);
      user = this.userRepo.getByCNPJ(encryptedCNPJ);
    } else if (data.email) {
      user = this.userRepo.getByEmail(data.email);
    }

    if (!user) throw new NotFoundException('Credentials invalid');

    const isPassword = await bcrypt.compare(user.password, data.password);
    if (!isPassword) throw new NotFoundException('Credentials invalid');

    const payload = payloadJWT(user);
    const token = jwt.sign(payload, env.JWT_SECRET);

    return token;
  }
}
