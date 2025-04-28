"use server"

import { BudgetType, errorResponseSchema, passwordValidationSchema, successResponseSchema } from "@/schemas";
import { getToken } from "@/utilities/getToken.util";
import { revalidatePath } from "next/cache";

type ActionsStateType = {
  errors: Array<{ path: string; message: string }>,
  success: string
}

const initialSuccessState = ''

export async function deleteBudgetAction(budgetId: BudgetType["id"], prevState: ActionsStateType, formData: FormData) {
  const currentPassword = passwordValidationSchema.safeParse( formData.get('password') )

  /** Validar el esquema de la contraseña */
  if (!currentPassword.success) {
    const errors = currentPassword.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))

    return {
      errors,
      success: prevState.success
    }
  }

  const token = await getToken()

  /** Comprobar la contraseña */
  const URL_CHECK_PASSWORD = `${process.env.API_URL}/auth/check-password`
  
  const reqCheckPassword = await fetch(URL_CHECK_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      password: currentPassword.data
    })
  })

  const resCheckPassword = await reqCheckPassword.json()

  if (!reqCheckPassword.ok) {
    const { error } = errorResponseSchema.parse(resCheckPassword)

    return {
      errors: [{
        path: 'password',
        message: error
      }],
      success: initialSuccessState
    }
  }

  /** Eliminar el presupuesto */
  const URL_DELETE_BUDGET = `${process.env.API_URL}/budgets/${budgetId}`

  const reqDeleteBudget = await fetch(URL_DELETE_BUDGET, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const resDeleteBudget = await reqDeleteBudget.json()

  if (!reqDeleteBudget.ok) {
    const { error } = errorResponseSchema.parse(resDeleteBudget)

    return {
      errors: [{
        path: 'global',
        message: error
      }],
      success: initialSuccessState
    }
  }

  revalidatePath('/dashboard')

  const success = successResponseSchema.parse(resDeleteBudget)

  return {
    errors: [],
    success
  }
}
