import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LoginUserDTO {
  @ApiPropertyOptional({ example: 'pedro.silva@email.com', description: 'Email of the user' })
  email?: string;

  @ApiPropertyOptional({ example: '12345678901', description: 'CPF with 11 digits' })
  cpf?: string;

  @ApiPropertyOptional({ example: '12345678000199', description: 'CNPJ with 14 digits' })
  cnpj?: string;

  @ApiProperty({ example: 'StrongP@ss123', description: 'Password of the user' })
  password: string;
}
