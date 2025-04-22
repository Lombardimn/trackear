"use server"

import { errorResponseSchema, loginSchema } from "@/schemas"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>
}

export async function authenticateUser(prevState: ActionStateType, formData: FormData) {
  const loginCredentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  /** Validar el esquema */
  const auth = loginSchema.safeParse(loginCredentials)
  if (!auth.success) {
    const errors = auth.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))
    return {
      errors
    }
  }

  /** Autenticar el usuario */
  const URL = `${process.env.API_URL}/auth/login`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: auth.data.password,
      email: auth.data.email
    })
  })

  const res = await req.json()

  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    
    return {
      errors: [
        {
          path: "global",
          message: error
        }
      ]
    }
  }

  /** Setear Cookies */
  (await cookies()).set({
    name: 'TRACKEAR_TOKEN',
    value: res,
    httpOnly: true,
    path: '/'
  })

  redirect('/dashboard')
}