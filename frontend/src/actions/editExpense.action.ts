"use server"

import { BudgetType, errorResponseSchema, expensesSchema, ExpenseType, successResponseSchema } from "@/schemas"
import { getToken } from "@/utilities/getToken.util"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: Array<{ path: string, message: string }>,
  success: string
}

type BudgetAndExpenseIdType = {
  budgetId: BudgetType['id'],
  expenseId: ExpenseType['id']
}

const initialStateSuccess = ''

export async function editExpenseAction(
  {budgetId, expenseId}: BudgetAndExpenseIdType,
  prevState: ActionStateType,
  formData: FormData
) {

  /** Obtenemos los datos  */
  const expense = expensesSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })

  if (!expense.success) {
    const errors = expense.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))
    return {
      errors,
      success: prevState.success
    }
  }

  /** Actualizamos el gasto */
  const token = await getToken()
  const URL = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount
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
      success: initialStateSuccess
    }
  }

  /** Revalidar la cache */
  revalidatePath(`/dashboard/budgets/${budgetId}`)

  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}