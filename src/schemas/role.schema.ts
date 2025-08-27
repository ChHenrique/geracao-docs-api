import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z)

export const permissionsEnum = z.enum([
  'CREATE_DOCUMENT',
  'READ_DOCUMENT',
  'UPDATE_DOCUMENT',
  'DELETE_DOCUMENT',
  'MANAGE_USERS',
  'MANAGE_ROLES',
  'MANAGE_TEMPLATES',
  'APPROVE_DOCUMENT',
  'REVIEW_DOCUMENT',
  'SIGN_DOCUMENT',
  'PUBLISH_DOCUMENT'
]);

export const roleSchema = z.object({
  name: z.string().min(1).max(255),
  permissions: z.array(permissionsEnum)
}).openapi("Role schema");

export const roleSchemaUpdate = z.object({
  name: z.string().min(1).max(255).optional(),
  permissions: z.array(permissionsEnum).optional()
}).openapi("Role schema Update");


export type roleSchemaUpdateDTO = z.infer<typeof roleSchemaUpdate>;
export type roleSchemaDTO = z.infer<typeof roleSchema>;
