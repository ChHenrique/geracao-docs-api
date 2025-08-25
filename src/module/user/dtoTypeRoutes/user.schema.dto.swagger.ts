import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ example: 'Pedro', description: 'First name of the user' })
  name: string;

  @ApiProperty({ example: 'Silva', description: 'Last name of the user' })
  lastname: string;

  @ApiProperty({ example: 'StrongP@ss123', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'pedro.silva@email.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: '12345678901', description: 'CPF with 11 digits' })
  cpf: string;

  @ApiProperty({ example: '12345678000199', description: 'CNPJ with 14 digits' })
  cnpj: string;

  @ApiProperty({ example: 'ADMIN', description: 'Role of the user' })
  role: string;
}
