import { permissionType } from 'src/types/permissions.type';

export class RoleEntitie {
  constructor(
    public name: string,
    public permissions: permissionType[],
  ) {}
}
