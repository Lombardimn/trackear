"use server"

import { errorResponseSchema, resetPasswordSchema, successResponseSchema } from "@/schemas";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>
  success: string
}

const initialSuccessState = ''

export async function resetPasswordAction(token: string, prevState: ActionStateType, formData: FormData) {
  const resetPasswordInput = {
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  }

  const resetPassword = resetPasswordSchema.safeParse(resetPasswordInput)

  if (!resetPassword.success) {
    const errors = resetPassword.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))


    return {
      errors,
      success: prevState.success
    }
  }

  const URL = `${process.env.API_URL}/auth/reset-password/${token}`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: resetPasswordInput.password
    })
  })

  const res = await req.json()
  if (!req.ok) {
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