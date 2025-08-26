import { Request } from 'express';
import type { IUserRepository } from '../userDomain/user.repository';
import { checkAccess } from 'src/utils/checkAccess';
import { User } from '@prisma/client';
import { decryptCPF } from 'src/utils/decryptedCPF';
import { decryptCNPJ } from 'src/utils/decryptedCNPJ';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserGetUniqueUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(req: Request) {
    const user: User = await checkAccess(req, this.userRepo.getById);

    user.cpf = decryptCPF(user.cpf);
    if (user.cnpj) user.cnpj = decryptCNPJ(user.cnpj);

    return user;
  }
}
