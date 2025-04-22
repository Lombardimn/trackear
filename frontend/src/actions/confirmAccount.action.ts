"use server"

import { errorResponseSchema, successResponseSchema, tokenSchema } from "@/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

const initialSuccessState = ''

export async function confirmAccount(token: string, prevState: ActionStateType) {
  const confirmToken = tokenSchema.safeParse(token)

  if (!confirmToken.success) {
    return {  
      errors: confirmToken.error.issues.map(issue => issue.message),
      success: prevState.success
    }
  }

  /** Registrar el usuario */
  const URL = `${process.env.API_URL}/auth/confirm-account`
  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: confirmToken.data
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