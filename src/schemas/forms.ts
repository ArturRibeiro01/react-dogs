import { z } from 'zod';

const requiredMessage = 'Preencha este campo.';
const passwordMessage =
  'A senha precisa ter no mínimo 8 caracteres, com uma letra maiúscula, uma letra minúscula e um número.';
const emailMessage = 'Preencha um e-mail válido.';
const acceptedPostImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxPostImageSize = 5 * 1024 * 1024;

const emailSchema = z
  .string()
  .trim()
  .min(1, requiredMessage)
  .refine((value) => value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), emailMessage);

const strongPasswordSchema = z
  .string()
  .regex(/^(?=\S{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, passwordMessage);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, requiredMessage),
});

export const createUserSchema = z.object({
  username: z.string().trim().min(1, requiredMessage),
  email: emailSchema,
  password: strongPasswordSchema,
});

export const passwordLostSchema = z.object({
  login: emailSchema,
});

export const passwordResetSchema = z.object({
  password: strongPasswordSchema,
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

export const postUploadSchema = z.object({
  dogId: z.string().trim().min(1, 'Selecione um cachorro.'),
  caption: z.string().trim().optional(),
  file: z
    .custom<FileList>()
    .refine((files) => files instanceof FileList && files.length === 1, 'Selecione uma imagem.')
    .refine(
      (files) => !files?.[0] || acceptedPostImageTypes.includes(files[0].type),
      'Use uma imagem JPEG, PNG ou WebP.',
    )
    .refine(
      (files) => !files?.[0] || files[0].size <= maxPostImageSize,
      'A imagem deve ter no máximo 5 MB.',
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type PasswordLostFormData = z.infer<typeof passwordLostSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
export type PhotoPostFormData = z.infer<typeof photoPostSchema>;
export type DogCreateFormData = z.infer<typeof dogCreateSchema>;
export type PostUploadFormData = z.infer<typeof postUploadSchema>;
