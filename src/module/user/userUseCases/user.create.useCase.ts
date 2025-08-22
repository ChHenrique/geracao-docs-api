import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import type { IUserRepository } from "../userDomain/user.repository"
import { userSchema, userSchemaDTO } from "src/schemas/user.schema"
import { isUnique } from "src/utils/isUnique"
import bcrypt from 'bcrypt'
import { UserEntitie } from "../userDomain/user.entities"
import { encryptCPF } from "src/utils/encryptCPF"
import { encryptCNPJ } from "src/utils/encryptCNPJ"
import type { IRoleRepository } from "src/module/role/roleDomain/role.repository"

@Injectable()
export class UserCreateUseCase {
    constructor(
        private repoUser: IUserRepository,
        private repoRole: IRoleRepository
    ){}

    async execute(data: userSchemaDTO){
        const parsedData = userSchema.safeParse(data)
        if (!parsedData.success) throw new BadRequestException("Bad Request")

        await isUnique(this.repoUser, data)
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const encryptedCPF = encryptCPF(data.cpf)
        const encryptedCNPJ = encryptCNPJ(data.cnpj)

        const role = await this.repoRole.getByName(data.role)
        if (!role) throw new NotFoundException("This role does not exist")

        const user = new UserEntitie(data.name, data.lastname, hashedPassword, data.email, encryptedCPF, encryptedCNPJ, role.id)
        await this.repoUser.create(user)

        const { password, cpf, cnpj, roleId, ...rest} = user
        return {rest, role: data.role}
    }
}