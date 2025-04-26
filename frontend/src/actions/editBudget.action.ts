"use server"

import { BudgetType, draftBudgetSchema, errorResponseSchema, successResponseSchema } from "@/schemas";
import { getToken } from "@/utilities/getToken.util";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>,
  success: string
}

const initialSuccessState = ''

export async function editBudgetAction(budgetId: BudgetType["id"], prevState: ActionStateType, formData: FormData) {

  /** Obtener los datos */
  const budgetData = {
    name: formData.get('name'),
    amount: formData.get('amount')
  }

  /** Validar el esquema */
  const budget= draftBudgetSchema.safeParse(budgetData)
  if (!budget.success) {
    const errors = budget.error.errors.map(error => ({
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
  const URL = `${process.env.API_URL}/budgets/${budgetId}`
  const req = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount
    })
  })

  const res = await req.json()

  /** Validar la respuesta */
  if (!req.ok) {
    const { error } = errorResponseSchema.parse(res)
    return {
      errors: [{
        path: 'global',
        message: error
      }],
      success: initialSuccessState
    }
  }

  /** Revalidar la cache */
  revalidatePath('/dashboard')

  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}