import { z } from "zod";

export const reservationSchema = z
  .object({
    booking: z.string().min(1, "El código de reserva es requerido"),
    check_in_date: z.string().min(1, "La fecha de entrada es requerida"),
    check_out_date: z.string().min(1, "La fecha de salida es requerida"),
    total_amount: z.number().min(0.01, "El monto total debe ser mayor a 0"),
    accomodation_id: z.number().min(1, "Debe seleccionar una acomodación"),
    user_id: z.number().min(1, "Debe indicar el ID de usuario"),
    status: z.string().optional(),
  })
  .refine(
    (data) => {
      return new Date(data.check_out_date) > new Date(data.check_in_date);
    },
    {
      path: ["check_out_date"],
      message: "La fecha de salida debe ser posterior a la de entrada",
    }
  );

export type ReservationFormData = z.infer<typeof reservationSchema>;