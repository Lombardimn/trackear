import { z } from "zod";

const regexValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export const RegisterSchema = z.object({
  username: z.string()
    .min(1,{ message: "El Nombre no puede estar vacío"})
    .max(20, { message: "El Nombre debe tener menos de 20 caracteres" }),
  email: z.string()
    .min(1,{ message: "El Email no puede estar vacío"})
    .email({ message: "El Email no es valido" }),
  password: z.string()
    .min(8, { message: "La Contraseña debe tener al menos 8 caracteres" })
    .regex(regexValidator, { message: 'Debe contener al menos 1 minuscula, 1 mayuscula, 1 caracter especial y 1 numero' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
})

export const errorResponseSchema = z.object({ error: z.string() })

export const successResponseSchema = z.string()

export const tokenSchema = z
  .string({message: "El token no es valido"})
  .length(6, { message: "El token debe tener 6 caracteres" })