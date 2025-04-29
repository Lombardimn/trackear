import { verifySession } from "@/guards/dal.guard"
import { getToken } from "@/utilities/getToken.util"

interface Params {
  budgetId: string,
  expenseId: string
}

export async function GET(request: Request, {params}: {params: Params}) {
  /** Verificar sesion activa */
  await verifySession()

  const { budgetId, expenseId } = await params
  const token = await getToken()
  const URL = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

  const req = await fetch(URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const res = await req.json()
  
  if (!req.ok) {
    return Response.json(res.error, { status: 403 })
  }

  return Response.json(res)
}