import z from 'zod';

export const roleSchema = z.object({
  name: z.string().min(1).max(255),
});

export type roleSchemaDTO = z.infer<typeof roleSchema>;
