import { z } from 'zod';

const requiredMessage = 'Preencha este campo.';
const passwordMessage =
  'A senha precisa ter no mínimo 8 caracteres, com uma letra maiúscula, uma letra minúscula e um número.';
const emailMessage = 'Preencha um e-mail válido.';

const emailSchema = z
  .string()
  .trim()
  .min(1, requiredMessage)
  .refine((value) => value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), emailMessage);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, requiredMessage),
});

export const createUserSchema = z.object({
  username: z.string().trim().min(1, requiredMessage),
  email: emailSchema,
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, passwordMessage),
});

export const passwordLostSchema = z.object({
  login: emailSchema,
});

export const passwordResetSchema = z.object({
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, passwordMessage),
});

export const photoPostSchema = z.object({
  nome: z.string().trim().min(1, requiredMessage),
  peso: z.string().trim().min(1, requiredMessage).regex(/^\d+$/, 'Utilize apenas números.'),
  idade: z.string().trim().min(1, requiredMessage).regex(/^\d+$/, 'Utilize apenas números.'),
});

export const dogCreateSchema = z.object({
  name: z.string().trim().min(1, requiredMessage),
  breedId: z.string().trim().min(1, 'Selecione uma raça.'),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  weight: z.string().trim().optional(),
  sex: z.enum(['', 'male', 'female', 'unknown']),
  size: z.enum(['', 'small', 'medium', 'large', 'giant']),
  bio: z.string().trim().optional(),
  isPublic: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type PasswordLostFormData = z.infer<typeof passwordLostSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
export type PhotoPostFormData = z.infer<typeof photoPostSchema>;
export type DogCreateFormData = z.infer<typeof dogCreateSchema>;
