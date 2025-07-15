import { z } from 'zod';

export const propertyFormSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  address: z
    .string()
    .min(1, 'La dirección es requerida')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida'),
  image: z.any().nullable().optional(),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;