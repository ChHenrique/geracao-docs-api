import { NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../userDomain/user.repository";

export class UserGetAllUseCase {
    constructor(private repo: IUserRepository){}

    async execute(){
        const users = await this.repo.getAll()
        if (!users || users.length <= 0) throw new NotFoundException("No users were registered")

        const sanitizeUsers = users?.map(({ password, cpf, cnpj, roleId, ...rest }) => rest)
        return sanitizeUsers
    }
}
