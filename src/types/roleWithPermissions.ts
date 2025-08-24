import { Role } from '@prisma/client';

export type RoleWithPermissions = Role & {
  permissions: { permission: { name: string } }[];
} & {
  users: {
    id: string;
    name: string;
    lastname: string;
    role: { id: string; name: string };
  }[];
};
