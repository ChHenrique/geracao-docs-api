import z from "zod"

export const userSchema = z.object({
    name: z.string().min(1).max(255),
    lastname: z.string().min(1).max(255),
    password: z.string().min(8),
    email: z.email(),
    cpf: z.string().length(11),
    cnpj: z.string().length(14),
})