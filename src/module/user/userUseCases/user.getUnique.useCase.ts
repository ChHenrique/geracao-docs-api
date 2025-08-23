import { Request } from 'express';
import { IUserRepository } from '../userDomain/user.repository';
import { checkAccess } from 'src/utils/checkAccess';
import { User } from '@prisma/client';
import { decryptCPF } from 'src/utils/decryptedCPF';
import { decryptCNPJ } from 'src/utils/decryptedCNPJ';

export class UserGetUniqueUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(req: Request) {
    const user: User = await checkAccess(req, this.repo.getById);

    user.cpf = decryptCPF(user.cpf);
    if (user.cnpj) user.cnpj = decryptCNPJ(user.cnpj);

    return user;
  }
}
