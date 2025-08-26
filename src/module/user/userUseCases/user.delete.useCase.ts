import { Request } from 'express';
import type { IUserRepository } from '../userDomain/user.repository';
import { checkAccess } from 'src/utils/checkAccess';
import { User } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserDeleteUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(req: Request) {
    const user: User = await checkAccess(req, this.userRepo.getById);
    await this.userRepo.delete(user.id);
  }
}
