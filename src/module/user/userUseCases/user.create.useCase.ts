import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUserRepository } from '../userDomain/user.repository';
import { userSchemaDTO } from 'src/schemas/user.schema';
import { isUnique } from 'src/utils/isUnique';
import bcrypt from 'bcrypt';
import { UserEntitie } from '../userDomain/user.entities';
import { encryptCPF } from 'src/utils/encryptCPF';
import { encryptCNPJ } from 'src/utils/encryptCNPJ';
import type { IRoleRepository } from 'src/module/role/roleDomain/role.repository';
import { isValidCPF } from 'src/utils/validCPF';
import { isValidCNPJ } from 'src/utils/validCNPJ';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject('IUserRepository') private userRepo: IUserRepository,
    @Inject('IRoleRepository') private roleRepo: IRoleRepository,
  ) {}

  async execute(data: userSchemaDTO) {
    await isUnique(this.userRepo, data);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const isValidCpf = isValidCPF(data.cpf);
    const isValidCnpj = isValidCNPJ(data.cnpj);

    if (!isValidCpf) throw new BadRequestException('Invalid CPF');
    if (!isValidCnpj) throw new BadRequestException('Invalid CNPJ');

    const encryptedCPF = encryptCPF(data.cpf);
    const encryptedCNPJ = encryptCNPJ(data.cnpj);

    const role = await this.roleRepo.getByName(data.role);
    if (!role) throw new NotFoundException('This role does not exist');

    const user = new UserEntitie(
      data.name,
      data.lastname,
      hashedPassword,
      data.email,
      encryptedCPF,
      encryptedCNPJ,
      role.id,
    );
    await this.userRepo.create(user);

    const { password, cpf, cnpj, roleId, ...rest } = user;
    return rest;
  }
}
