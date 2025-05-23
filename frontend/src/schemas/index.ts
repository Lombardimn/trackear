import { z } from "zod";

const regexValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export const RegisterSchema = z.object({
  username: z.string()
    .min(1, { message: "El Nombre no puede estar vacío" })
    .max(20, { message: "El Nombre debe tener menos de 20 caracteres" }),
  email: z.string()
    .min(1, { message: "El Email no puede estar vacío" })
    .email({ message: "El Email no es valido" }),
  password: z.string()
    .min(8, { message: "La Contraseña debe tener al menos 8 caracteres" })
    .regex(regexValidator, { message: 'Debe contener al menos 1 minuscula, 1 mayuscula, 1 caracter especial y 1 numero' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
})

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "El Email no puede estar vacío" })
    .email({ message: "El Email no es valido" }),
  password: z.string()
    .min(1, { message: "La Contraseña debe tener al menos 8 caracteres" })
})

export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' })
})

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: 'La Contraseña debe tener al menos 8 caracteres' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no son iguales",
  path: ["password_confirmation"]
})

export const tokenSchema = z
  .string({ message: "El token no es valido" })
  .length(6, { message: "El token debe tener 6 caracteres" })

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

export const draftBudgetSchema = z.object({
  name: z.string()
    .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce.
    number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
})

export const expenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number()
})

export const budgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(expenseAPIResponseSchema)
})

export const expensesSchema = z.object({
  name: z.string()
    .min(1, { message: 'El Nombre del gasto es obligatorio' }),
  amount: z.coerce
    .number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
})

export const budgetAPI = z.array(
  budgetAPIResponseSchema
    .omit({ expenses: true })
)

export const updatePasswordSchema = z.object({
  current_password: z.string()
    .min(1, { message: 'La contraseña es obligatoria' }),
  password: z.string()
    .min(8, { message: 'La nueva contraseña debe ser de al menos 8 caracteres' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no son iguales",
  path: ["password_confirmation"]
})

export const profileFormSchema = z.object({
  name: z.string()
    .min(1, { message: 'Tu Nombre no puede ir vacio' }),
  email: z.string()
    .min(1, { message: 'El Email es obligatorio' })
    .email({ message: 'Email no válido' }),
})

export const passwordValidationSchema = z.string().min(1, { message: 'La contraseña es obligatoria' })
export const errorResponseSchema = z.object({ error: z.string() })
export const successResponseSchema = z.string()

/** Tipos inferidos */
export type UserType = z.infer<typeof userSchema>
export type BudgetType = z.infer<typeof budgetAPIResponseSchema>
export type ExpenseType = z.infer<typeof expenseAPIResponseSchema>
export type ExpenseTypeFromAPI = z.infer<typeof expensesSchema>
