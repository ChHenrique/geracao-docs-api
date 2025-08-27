import { ApiProperty } from '@nestjs/swagger';
import { PermissionsName } from '@prisma/client';

export class RoleSchema {
  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  name: string;

  @ApiProperty({ example: PermissionsName, description: 'Permissions' })
  permissions: PermissionsName[];
}
