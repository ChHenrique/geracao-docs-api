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
import { Request } from 'express';

@Injectable()
export class UserloginUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) { }

  private async getUserData(data: userSchemaLoginDTO) {
    if (data.cpf) return this.userRepo.getByCPF(encryptCPF(data.cpf));
    if (data.cnpj) return this.userRepo.getByCNPJ(encryptCNPJ(data.cnpj));
    if (data.email) return this.userRepo.getByEmail(data.email);
    return null;
  }

  private async tokenGenerate(user: any) {
    const permissions = user.role.permissions.map(rp => rp.permission);
    const payload = payloadJWT({ ...user, role: { ...user.role, permissions } });

    return jwt.sign(payload, env.JWT_SECRET)
  }

  async execute(data: userSchemaLoginDTO, req: Request) {
    let user: any;

    if (req.user) {
      user = await this.userRepo.getById(req.user.id)
      if (!user) throw new NotFoundException('User not found')
      return this.tokenGenerate(user);
    }

    user = await this.getUserData(user)
    if (!user) throw new NotFoundException('Credentials invalid')

    const isPassword = await bcrypt.compare(data.password, user.password)
    if (!isPassword) throw new NotFoundException('Credentials invalid');


    return this.tokenGenerate(user);
  }
}
