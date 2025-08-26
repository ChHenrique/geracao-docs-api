import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { PermissionsName } from "@prisma/client"

export class UpdateRoleSchema {
    @ApiPropertyOptional({example: "ADMIN", description: 'Role name'})
    name: string

    @ApiProperty({example: PermissionsName, description: 'Permissions'})
    permissions: PermissionsName[]
}