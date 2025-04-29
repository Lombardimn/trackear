"use server"

import { errorResponseSchema, successResponseSchema, updatePasswordSchema } from "@/schemas";
import { getToken } from "@/utilities/getToken.util";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>
  success: string
}

export async function updatePasswordAction(prevState: ActionStateType, formData: FormData) {

  /** Obtenemos los datdos del form */
  const userPassword = updatePasswordSchema.safeParse({
    current_password: formData.get('current_password'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  })

  if (!userPassword.success) {
    const errors = userPassword.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))

    return {
      errors,
      success: prevState.success
    }
  }

  /** Actualizamos el password del usuario */
  const token = await getToken()
  const URL = `${process.env.API_URL}/auth/update-password`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      current_password: userPassword.data.current_password,
      password: userPassword.data.password
    })
  })

  const res = await req.json()

  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    return {
      errors : [{
        path: 'global',
        message: error
      }],
      success: prevState.success
    }
  }

  const success = successResponseSchema.parse(res)
  
  return {
    errors: [],
    success
  }
}