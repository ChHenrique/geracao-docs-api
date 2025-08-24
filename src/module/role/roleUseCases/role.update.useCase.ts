import { roleSchemaUpdateDTO } from 'src/schemas/role.schema';
import type { IRoleRepository } from '../roleDomain/role.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntitie } from '../roleDomain/role.entitie';
import { permissionType } from 'src/types/permissions.type';

@Injectable()
export class RoleUpdateUseCase {
  constructor(@Inject('IRoleRepository') private roleRepo: IRoleRepository) {}

  async execute(data: roleSchemaUpdateDTO, id: string) {
    const isRoleExist = await this.roleRepo.getById(id);
    if (!isRoleExist) throw new NotFoundException('This role does not exist');

    const nameToUpdate = data.name ?? isRoleExist.name;
    const permissionToUpdate: permissionType[] = data.permissions
      ? data.permissions
      : isRoleExist.permissions.map((p) => p.permission.name as permissionType);

    const roleToUpdate = new RoleEntitie(nameToUpdate, permissionToUpdate);
    await this.roleRepo.update(isRoleExist.id, roleToUpdate, isRoleExist);
  }
}
