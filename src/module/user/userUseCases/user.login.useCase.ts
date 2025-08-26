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
import { prisma } from 'src/config/prisma.config';

@Injectable()
export class UserloginUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(data: userSchemaLoginDTO) {
    let user: any;

    if (data.cpf) {
      const encryptedCPF = encryptCPF(data.cpf)
      user = await this.userRepo.getByCPF(encryptedCPF)
    } else if (data.cnpj) {
      const encryptedCNPJ = encryptCNPJ(data.cnpj)
      user = await this.userRepo.getByCNPJ(encryptedCNPJ)
    } else if (data.email) {
      user = await this.userRepo.getByEmail(data.email)
    }

    if (!user) throw new NotFoundException('Credentials invalid')

    const isPassword = await bcrypt.compare(data.password, user.password)
    if (!isPassword) throw new NotFoundException('Credentials invalid');
    
    const permissions = user.role.permissions.map(rp => rp.permission);
    const payload = payloadJWT({ ...user, role: { ...user.role, permissions } });

    const token = jwt.sign(payload, env.JWT_SECRET)

    return token;
  }
}
