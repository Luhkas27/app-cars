import { z } from 'zod';

export const signInSchema = z.object({
  user: z.string().min(1, 'O nome é obrigatório'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(3, 'A senha deve ter no mínimo 6 caracteres'),
});

export type SignInData = z.infer<typeof signInSchema>;
