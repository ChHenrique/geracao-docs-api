import { encryptCPF } from "./encryptCPF"
import { encryptCNPJ } from "./encryptCNPJ"
import bcrypt from 'bcrypt'

export async function encryptUserData(data: any, userExist: any) {
    if (data.password) userExist.password = await bcrypt.hash(userExist.password, 10)
    if (data.cpf) userExist.cpf = encryptCPF(userExist.cpf)
    if (data.cnpj && userExist.cnpj) userExist.cnpj = encryptCNPJ(userExist.cnpj)
}