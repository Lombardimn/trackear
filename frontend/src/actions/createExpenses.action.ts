"use server"

import { errorResponseSchema, expensesSchema, successResponseSchema } from "@/schemas";
import { getToken } from "@/utilities/getToken.util";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>,
  success: string
}

const initialStateSuccess = ''

export default async function createExpensesAction(budgetId: number, prevState: ActionStateType, formData: FormData) {

  /** Obtener los datos del gasto */
  const expenseData = {
    name: formData.get('name'),
    amount: formData.get('amount')
  }

  /** Validar el esquema */
  const expense = expensesSchema.safeParse(expenseData)
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

  /** Obtener el token y enviar la solicitud */
  const token = await getToken()
  const URL = `${process.env.API_URL}/budgets/${budgetId}/expenses`
  const req = await fetch(URL, {
    method: 'POST',
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