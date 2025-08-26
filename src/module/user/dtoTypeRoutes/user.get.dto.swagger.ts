import { ApiProperty } from "@nestjs/swagger";

export class UserGetAllResponseDTO {
    @ApiProperty({ example: 'Pedro', description: 'First name of the user' })
    name: string;

    @ApiProperty({ example: 'Silva', description: 'Last name of the user' })
    lastname: string;

    @ApiProperty({ example: 'pedro.silva@email.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: '2025-08-25T18:31:56.424Z', description: 'Date the user was created' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-26T17:21:28.832Z', description: 'Date the user was updated' })
    updatedAt: Date;

    @ApiProperty({
        example: {
            "id": "8d46def1-7131-4260-902b-57749e5955c9",
            "name": "ADMINISTRADOR"
        }, description: 'Data of roles'
    })
    role: { id: string, name: string }

    @ApiProperty({example: '[object]'})
    AuditLog: Object[]

    @ApiProperty({example: '[object]'})
    templates: Object[]
}