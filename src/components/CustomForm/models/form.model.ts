import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z
      .string()
      .trim()
      .min(1, "El correo es obligatorio")
      .pipe(z.email("Correo Inválido")),
    password: z
      .string()
      .min(5, "La contraseña debe tener al menos 6 carácteres"),
    confirmPassword: z
      .string()
      .min(6, "La confimación debe tener al menos 6 carácteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas son diferentes",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof schema>;
