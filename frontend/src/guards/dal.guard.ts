import 'server-only'
import { userSchema } from "@/schemas"
import { redirect } from "next/navigation"
import { cache } from "react"
import { getToken } from '@/utilities/getToken.util'

export const verifySession = cache( async () => {
  const token = await getToken()
  if (!token) {
    return redirect('/auth/login')
  }

  const URL = `${process.env.API_URL}/auth/user`
  
  const req = await fetch(URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const res = await req.json()
  const result = userSchema.safeParse(res)

  if (!result.success) {
    return redirect('/auth/login')
  }

  return {
    user: result.data,
    isAuth: true
  }
})