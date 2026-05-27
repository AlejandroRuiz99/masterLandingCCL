import { z } from "zod";
import { categories } from "@/data/resources";

export const leadSchema = z.object({
  nombre: z.string().trim().min(2, "Introduce tu nombre"),
  apellidos: z.string().trim().min(2, "Introduce tus apellidos"),
  email: z.string().trim().email("Introduce un email válido"),
  telefono: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s]{9,15}$/, "Introduce un teléfono válido"),
  tematica: z.enum(categories as [string, ...string[]], {
    errorMap: () => ({ message: "Selecciona una temática" }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
  // metadatos del recurso (ocultos)
  recurso: z.string(),
});

export type LeadInput = z.infer<typeof leadSchema>;
