import { Role } from '@prisma/client';
import { permissionType } from 'src/types/permissions.type';
import { RoleEntitie } from './role.entitie';
import { RoleWithPermissions } from 'src/types/roleWithPermissions';

export interface IRoleRepository {
  create(data: RoleEntitie): Promise<Role | null>;
  update(id: string, data: RoleEntitie, role: any): Promise<Role | null>;
  delete(id: string): Promise<void>;
  getById(id: string);
  getAll(): Promise<Role[] | null>;
  getByName(name: string): Promise<Role | null>;
  getPermissionByName(names: permissionType[]);
}
