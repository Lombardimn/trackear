"use server"

import { errorResponseSchema, profileFormSchema, successResponseSchema } from "@/schemas"
import { getToken } from "@/utilities/getToken.util"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: Array<{ path: string, message: string }>
  success: string
}

export async function updateUserAction(prevState: ActionStateType, formData: FormData) {

  /** Validamos los datos ingresados */
  const profile = profileFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email')
  })

  if (!profile.success) {
    const errors = profile.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))

    return {
      errors,
      success: prevState.success
    }
  }

  const token = getToken()
  const URL = `${process.env.API_URL}/auth/user`
  const req = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: profile.data.name,
      email: profile.data.email
    })
  })

  const res = await req.json()

  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    return {
      errors: [{
        path: 'global',
        message: error
      }],
      success: prevState.success
    }
  }

  revalidatePath('/dashboard/profile/settings')
  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}