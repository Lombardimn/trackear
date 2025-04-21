"use server"

import { errorResponseSchema, RegisterSchema, successResponseSchema } from "@/schemas"

export type ActionStateType = {
  errors: Array<{ path: string; message: string }>
  success: string
}

const initialSuccessState = ''

export async function Register(prevState: ActionStateType ,formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  /** Validar el esquema */
  const register = RegisterSchema.safeParse(registerData)
  
  if (!register.success) {
    //const errors = register.error?.errors.map((error) => error.message)
    const errors = register.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))

    return { 
      errors,
      success: prevState.success
    }
  }

  /** Registrar el usuario */
  const URL = `${process.env.API_URL}/auth/create-account`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: register.data.email,
      name: register.data.username,
      password: register.data.password
    })
  })

  const res = await req.json()
  if (req.status === 409) {
    const { error } = errorResponseSchema.parse(res)

    return {
      success: initialSuccessState,
      errors: [
        {
          path: "global",
          message: error
        }
      ]
    }
  }

  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}