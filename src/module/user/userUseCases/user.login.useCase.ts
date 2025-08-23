import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUserRepository } from '../userDomain/user.repository';
import { userSchema, userSchemaLoginDTO } from 'src/schemas/user.schema';
import { decryptCPF } from 'src/utils/decryptedCPF';
import { decryptCNPJ } from 'src/utils/decryptedCNPJ';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { payloadJWT } from 'src/utils/payloadJwt';

@Injectable()
export class UserloginUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(data: userSchemaLoginDTO) {
    let user: any;

    const parsedData = userSchema.safeParse(data);
    if (!parsedData.success) throw new BadRequestException('Bad Request');

    if (data.cpf) {
      const decryptedCPF = decryptCPF(data.cpf);
      user = this.repo.getByCPF(decryptedCPF);
    } else if (data.cnpj) {
      const decryptedCNPJ = decryptCNPJ(data.cnpj);
      user = this.repo.getByCNPJ(decryptedCNPJ);
    } else if (data.email) {
      user = this.repo.getByEmail(data.email);
    }

    if (!user) throw new NotFoundException('Credentials invalid');

    const isPassword = await bcrypt.compare(user.password, data.password);
    if (!isPassword) throw new NotFoundException('Credentials invalid');

    const payload = payloadJWT(user);
    jwt.sign(payload, env.JWT_SECRET);
  }
}
