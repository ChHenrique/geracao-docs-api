import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IRoleRepository } from '../roleDomain/role.repository';

@Injectable()
export class RoleDeleteUseCase {
  constructor(@Inject('IRoleRepository') private roleRepo: IRoleRepository) {}

  async execute(id: string) {
    const isRoleExist = await this.roleRepo.getById(id);
    if (!isRoleExist) throw new NotFoundException('This role does not exist');

    if (isRoleExist.users.length > 0)
      throw new ConflictException('Cannot delete role assigned to users');

    await this.roleRepo.delete(id);
  }
}
