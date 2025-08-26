import z from "zod"

export const templateSchema = z.object({
    name: z.string().min(1).max(255),
    contentHTML: z.string().min(1),
})

export const updateTemplateSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    contentHTML: z.string().min(1).optional(),
})

export type templateSchemaDTO = z.infer<typeof templateSchema>
export type templateUpdateSchemaDTO = z.infer<typeof updateTemplateSchema>