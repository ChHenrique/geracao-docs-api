import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDTO {
  @ApiPropertyOptional({ example: 'Pedro', description: 'First name of the user' })
  name?: string;

  @ApiPropertyOptional({ example: 'Silva', description: 'Last name of the user' })
  lastname?: string;

  @ApiPropertyOptional({ example: 'NewStr0ngP@ss', description: 'User password' })
  password?: string;

  @ApiPropertyOptional({ example: 'pedro.silva@email.com', description: 'User email' })
  email?: string;

  @ApiPropertyOptional({ example: '12345678901', description: 'CPF with 11 digits' })
  cpf?: string;

  @ApiPropertyOptional({ example: '12345678000199', description: 'CNPJ with 14 digits' })
  cnpj?: string;

  @ApiPropertyOptional({ example: 'ADMIN', description: 'Role of the user' })
  role?: string;
}