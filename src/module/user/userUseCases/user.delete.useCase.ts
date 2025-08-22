import { Request } from "express";
import { IUserRepository } from "../userDomain/user.repository";
import { checkAccess } from "src/utils/checkAccess";
import { User } from "@prisma/client";

export class UserDeleteUseCase {
    constructor(private repo: IUserRepository){}

    async execute(req: Request){
        const user: User = await checkAccess(req, this.repo.getById);
        await this.repo.delete(user.id);
    }
}