import z from "zod"

export const templateSchema = z.object({
    name: z.string().min(1).max(255),
    contentHTML: z.string().min(1),
})

export type templateSchemaDTO = z.infer<typeof templateSchema>