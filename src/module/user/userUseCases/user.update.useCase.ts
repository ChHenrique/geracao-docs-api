import type { IRoleRepository } from 'src/module/role/roleDomain/role.repository';
import type { IUserRepository } from '../userDomain/user.repository';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { userSchemaUpdateDTO } from 'src/schemas/user.schema';
import { isUniqueUpdate } from 'src/utils/isUnique';
import { Request } from 'express';
import { updateFields } from 'src/utils/updateFields';
import { encryptUserData } from 'src/utils/encryptUserData';
import { checkAccess } from 'src/utils/checkAccess';
import { User } from '@prisma/client';

@Injectable()
export class UserUpdateUseCase {
  constructor(
    private repoUser: IUserRepository,
    private repoRole: IRoleRepository,
  ) {}

  async execute(data: userSchemaUpdateDTO, req: Request) {
    const user: User = await checkAccess(req, this.repoUser.getById);

    const userExist = await this.repoUser.getById(user.id);
    if (!userExist) throw new NotFoundException('This user does not exist');

    if (data.role) {
      const roleExist = await this.repoRole.getByName(data.role.toUpperCase());
      if (!roleExist) throw new NotFoundException('This role does not exist');
    }

    await isUniqueUpdate(this.repoUser, data, userExist);
    updateFields(userExist, data);

    await encryptUserData(data, userExist);
    await this.repoUser.update(user.id, userExist);
  }
}
