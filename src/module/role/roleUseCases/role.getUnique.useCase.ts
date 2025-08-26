import { Inject, Injectable } from '@nestjs/common';
import type { IRoleRepository } from '../roleDomain/role.repository';

@Injectable()
export class RoleGetUniqueUseCase {
  constructor(@Inject('IRoleRepository') private roleRepo: IRoleRepository) {}

  async execute(id: string) {
    const role = await this.roleRepo.getById(id);
    return role;
  }
}
