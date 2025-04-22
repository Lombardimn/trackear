import 'server-only'
import { userSchema } from "@/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

export const verifySession = cache( async () => {
  const token = (await cookies()).get('TRACKEAR_TOKEN')?.value
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