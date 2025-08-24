import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '../userDomain/user.repository';

@Injectable()
export class UserGetAllUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute() {
    const users = await this.userRepo.getAll();
    if (!users || users.length <= 0)
      throw new NotFoundException('No users were registered');

    const sanitizeUsers = users?.map(
      ({ password, cpf, cnpj, roleId, ...rest }) => rest,
    );
    return sanitizeUsers;
  }
}
