import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'La password deve avere almeno 6 caratteri'),
});

export const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z
    .string()
    .min(8, 'La password deve avere almeno 8 caratteri')
    .regex(/\d/, 'La password deve contenere almeno un numero')
    .regex(/[a-z]/, 'La password deve contenere almeno una lettera minuscola')
    .regex(/[A-Z]/, 'La password deve contenere almeno una lettera maiuscola'),
  confirmPassword: z.string(),
  role: z.enum(['CUSTOMER', 'VENDOR']).default('CUSTOMER'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
