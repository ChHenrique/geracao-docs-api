import { Role } from '@prisma/client';
import { IRoleRepository } from './role.repository';
import { prisma } from 'src/config/prisma.config';
import { insensitiveUserData } from 'src/interfaces/insensitive.userData';
import { RoleEntitie } from './role.entitie';
import { permissionType } from 'src/types/permissions.type';
import { RoleWithPermissions } from 'src/types/roleWithPermissions';

export class IRolePrismaRepository implements IRoleRepository {
  async create(data: RoleEntitie): Promise<Role | null> {
    const role = await prisma.role.create({
      data: {
        name: data.name,
        permissions: {
          create: data.permissions.map((permName) => ({
            permission: {
              connect: { name: permName },
            },
          })),
        },
      },
      include: { permissions: { include: { permission: true } } },
    });

    return role;
  }

  async update(id: string, data: RoleEntitie, role: any): Promise<Role | null> {
    const currentPermissions = role.permissions.map((rp) => rp.permission.name);

    const toAdd = data.permissions.filter(
      (p) => !currentPermissions.includes(p),
    );
    const toRemove = currentPermissions.filter(
      (p) => !data.permissions.includes(p),
    );

    const permissionsToRemove = await prisma.permission.findMany({
      where: { name: { in: toRemove } },
      select: { id: true },
    });

    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        name: data.name,
        permissions: {
          deleteMany: {
            permissionId: { in: permissionsToRemove.map((p) => p.id) },
          },
          create: toAdd.map((permName) => ({
            permission: { connect: { name: permName } },
          })),
        },
      },
      include: { permissions: { include: { permission: true } } },
    });

    return updatedRole;
  }

  async delete(id: string): Promise<void> {
    await prisma.rolePermission.deleteMany({
      where: { roleId: id },
    });

    await prisma.role.delete({
      where: { id },
    });
  }

  async getById(id: string): Promise<RoleWithPermissions | null> {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        users: {
          select: insensitiveUserData,
        },
        permissions: { include: { permission: true } },
      },
    });

    return role;
  }

  async getByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { name },
      include: {
        users: {
          select: insensitiveUserData,
        },
        permissions: true,
      },
    });

    return role;
  }

  async getAll(): Promise<Role[] | null> {
    const roles = await prisma.role.findMany({
      include: {
        users: {
          select: insensitiveUserData,
        },
        permissions: true,
      },
    });

    return roles;
  }

  async getPermissionByName(names: permissionType[]) {
    return await prisma.permission.findMany({
      where: { name: { in: names } },
    });
  }
}
