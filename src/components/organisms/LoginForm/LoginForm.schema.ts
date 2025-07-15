import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Ingrese un correo electrónico válido')
    .min(1, 'El correo electrónico es requerido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rememberMe: z.boolean().optional()
});

export type LoginFormData = z.infer<typeof loginSchema>;