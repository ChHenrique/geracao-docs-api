import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z)

export const roleSchema = z.object({
  name: z.string().min(1).max(255),
  permissions: z.array(z.enum([]))
}).openapi("Role schema")

export const roleSchemaUpdate = z.object({
  name: z.string().min(1).max(255).optional(),
  permissions: z.array(z.enum([]))
}).openapi("Role schema Update")

export type roleSchemaUpdateDTO = z.infer<typeof roleSchemaUpdate>;
export type roleSchemaDTO = z.infer<typeof roleSchema>;
