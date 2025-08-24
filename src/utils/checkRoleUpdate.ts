import { RoleEntitie } from 'src/module/role/roleDomain/role.entitie';

export function RoleAdd(data: RoleEntitie, currentPermissions: any) {
  const toAdd = data.permissions.filter(
    (p) => !currentPermissions?.includes(p),
  );

  return toAdd;
}

export function RoleRemove(data: RoleEntitie) {
  const toRemove = data.permissions.filter(
    (p) => !data.permissions?.includes(p),
  );

  return toRemove;
}
