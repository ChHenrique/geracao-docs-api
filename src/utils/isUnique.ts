import { ConflictException } from "@nestjs/common";
import { IUserRepository } from "src/module/user/userDomain/user.repository";

export async function isUnique(repo: IUserRepository, data: any){
    const isEmailExist = await repo.getByEmail(data.email);
    if (isEmailExist) throw new ConflictException("This email already exist");

    const isCPFExist = await repo.getByCPF(data.cpf);
    if (isCPFExist) throw new ConflictException("This cpf already exist");

    const isCNPJExist = await repo.getByCNPJ(data.cnpj);
    if (isCNPJExist) throw new ConflictException("This cnpj already exist");
}

export async function isUniqueUpdate(repo: IUserRepository, data: any, user: any){
    if (data.email && data.email !== user.email) {
        const isEmailExist = await repo.getByEmail(data.email);
        if (isEmailExist) throw new ConflictException("This email already exist");
    }

    if (data.cpf && data.cpf !== user.cpf) {
        const isCPFExist = await repo.getByCPF(data.cpf);
        if (isCPFExist) throw new ConflictException("This cpf already exist");
    }

    if (data.cnpj && data.cnpj !== user.cnpj) {
        const isCNPJExist = await repo.getByCNPJ(data.cnpj);
        if (isCNPJExist) throw new ConflictException("This cnpj already exist");
    }
}