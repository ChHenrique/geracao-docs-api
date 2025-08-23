import z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1).max(255),
  lastname: z.string().min(1).max(255),
  password: z.string().min(8),
  email: z.email(),
  cpf: z.string().length(11),
  cnpj: z.string().length(14),
  role: z.string(),
});

export const userSchemaUpdate = z.object({
  name: z.string().min(1).max(255).optional(),
  lastname: z.string().min(1).max(255).optional(),
  password: z.string().min(8).optional(),
  email: z.email().optional(),
  cpf: z.string().length(11).optional(),
  cnpj: z.string().length(14).optional(),
  role: z.string().optional(),
});

export const userSchemaLogin = z.object({
  email: z.email().optional(),
  cpf: z.string().length(11).optional(),
  cnpj: z.string().length(14).optional(),
  password: z.string().min(8),
});


export type userSchemaLoginDTO = z.infer<typeof userSchemaLogin>;
export type userSchemaDTO = z.infer<typeof userSchema>;
export type userSchemaUpdateDTO = z.infer<typeof userSchemaUpdate>