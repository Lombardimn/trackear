"use server"

import { draftBudgetSchema, errorResponseSchema, successResponseSchema } from "@/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: Array<{ path: string; message: string }>
  success: string
}

const initialSuccessState = ''

export async function createBudgetAction(prev: ActionStateType, formData: FormData) {
  const budget = draftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })

  if (!budget.success) {
    const errors = budget.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }))

    return {
      errors,
      success: prev.success
    }

  }

  const token = (await cookies()).get('TRACKEAR_TOKEN')?.value
  const URL = `${process.env.API_URL}/budgets`

  const req = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount
    })
  })

  if (!req.ok) {
    const { error } = errorResponseSchema.parse(await req.json())
    return {
      errors: [
        {
          path: 'global',
          message: error
        }
      ],
      success: initialSuccessState
    }
  }

  const res = await req.json()

  const success = successResponseSchema.parse(res)

  return {
    errors: [],
    success
  }
}
