"use server"

import { errorResponseSchema, forgotPasswordSchema, successResponseSchema } from "@/schemas";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>,
  success: string
}

export async function forgotPassword(prevState: ActionStateType, formData: FormData) {
  const forgotPassword = forgotPasswordSchema.safeParse({
    email: formData.get('email')
  })

  if (!forgotPassword.success) {
    const errors = forgotPassword.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))

    return { 
      errors,
      success: prevState.success
    }
  }

  const URL = `${process.env.API_URL}/auth/forgot-password`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: forgotPassword.data.email
    })
  })

  const res = await req.json()

  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    
    return {
      success: prevState.success,
      errors: [
        {
          path: "global",
          message: error
        }
      ],
    }
  }

  const success = successResponseSchema.parse(res)
  
  return {
    errors: [],
    success
  } 
}