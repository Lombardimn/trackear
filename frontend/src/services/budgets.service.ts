import { budgetAPIResponseSchema } from "@/schemas"
import { getToken } from "@/utilities/getToken.util"
import { notFound } from "next/navigation"
import { cache } from "react"

export const getBudget = cache( async (id: string) => {
  const token = await getToken()
  const URL = `${process.env.API_URL}/budgets/${id}`

  const req = await fetch(URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const res = await req.json()
  if (!req.ok) {
    notFound()
  }

  const budget = budgetAPIResponseSchema.parse(res)
  return budget
})