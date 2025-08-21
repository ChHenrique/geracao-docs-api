import z from "zod"

export const userSchema = z.object({
    name: z.string().min(1).max(255),
    lastname: z.string().min(1).max(255),
    password: z.string().min(8),
    email: z.email(),
    cpf: z.string().length(11),
    cnpj: z.string().length(14),
})

export class UserEntitie {
    constructor(
       public name: string,
       public lastname: string,
       public password: string,
       public email: string,
       public cpf: string,
       public cnpj: string
    ){}
}