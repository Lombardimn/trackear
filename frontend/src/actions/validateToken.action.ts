"use server"

import { errorResponseSchema, successResponseSchema, tokenSchema } from "@/schemas";

type ActionStateType = {
  errors: string[],
  success: string
}

const initialSuccessState = ''

export async function validateToken(token: string, prevState: ActionStateType) {
  const resetPasswordToken = tokenSchema.safeParse(token)

  if (!resetPasswordToken.success) {
    return {  
      errors: resetPasswordToken.error.issues.map(issue => issue.message),
      success: prevState.success
    }
  }

  const URL = `${process.env.API_URL}/auth/validate-token`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: resetPasswordToken.data
    })
  })

  const res = await req.json()

  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    
    return {
      errors: [error],
      success: initialSuccessState
    }
  }

  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}