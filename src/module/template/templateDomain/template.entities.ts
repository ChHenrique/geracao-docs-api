import z from "zod"

export const templateSchema = z.object({
    name: z.string().min(1).max(255),
    contentHTML: z.string().min(1),
})

export class TemplateEntity {
    constructor(
       public readonly id: string,
       public name: string,
       public contentHTML: string,
       public createdById: string
    ){}
}