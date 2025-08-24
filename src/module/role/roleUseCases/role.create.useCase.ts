import type { IRoleRepository } from '../roleDomain/role.repository';
import type { roleSchemaDTO } from 'src/schemas/role.schema';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RoleEntitie } from '../roleDomain/role.entitie';

@Injectable()
export class RoleCreateUseCase {
  constructor(@Inject('IRoleRepository') private roleRepo: IRoleRepository) {}

  async execute(data: roleSchemaDTO) {
    const isRoleExist = await this.roleRepo.getByName(data.name);
    if (isRoleExist) throw new ConflictException('This role already exist');

    const permissions = await this.roleRepo.getPermissionByName(
      data.permissions,
    );
    if (permissions.length !== data.permissions.length)
      throw new BadRequestException('One or more permissions not found');

    const role = new RoleEntitie(data.name, data.permissions);
    await this.roleRepo.create(data);

    return role;
  }
}
