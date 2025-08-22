import z from "zod"

/* model Template {
  id           String             @id @unique @default(uuid())
  name         String
  contentHTML String
  createdById  String
  createdBy    User               @relation(fields: [createdById], references: [id])
  variables    VariableTemplate[]
  documents    Document[]
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt
} */

export const templateSchema = z.object({
    name: z.string().min(1).max(255),
    contentHTML: z.string().min(1).max(255),
})

export class TemplateEntitie {
    constructor(
       public name: string,
       public contentHTML: string
    ){}
}