"use server"

import { BudgetType, errorResponseSchema, ExpenseType, successResponseSchema } from "@/schemas"
import { getToken } from "@/utilities/getToken.util"
import { revalidatePath } from "next/cache"

type BudgetAndExpenseIdType = {
  budgetId: BudgetType['id']
  expenseId: ExpenseType['id']
}

type ActionStateType = {
  errors: Array<{ path: string; message: string }>,
  success: string
}

export default async function deleteExpenseAction(
  {budgetId, expenseId}: BudgetAndExpenseIdType,
  prevState: ActionStateType
) {

  const token = await getToken()
  const URL = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const res = await req.json()
  
  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    return {
      errors: [
        {
          path: 'global',
          message: error
        }
      ],
      success: prevState.success
    }
  }

  revalidatePath(`dashboard/${budgetId}`)

  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}