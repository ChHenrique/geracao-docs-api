import { Inject, Injectable } from '@nestjs/common';
import type { IRoleRepository } from '../roleDomain/role.repository';

@Injectable()
export class RoleGetAllUseCase {
  constructor(@Inject('IRoleRepository') private roleRepo: IRoleRepository) {}

  async execute() {
    const roles = await this.roleRepo.getAll();
    return roles;
  }
}
