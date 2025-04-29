import { verifySession } from "@/guards/dal.guard"
import { getToken } from "@/utilities/getToken.util"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> }
) {
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

  const json = await req.json()
  
  if (!req.ok) {
    return NextResponse.json({ error: json.error }, { status: req.status })
  }
 
  return NextResponse.json(json)
}