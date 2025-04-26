"use client"

import { SealCheck, Siren } from "@phosphor-icons/react"
import Button from "../ui/Button"
import { useActionState, useEffect, useState } from "react"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import BudgetForm from "./BudgetForm"
import { BudgetType } from "@/schemas"
import { editBudgetAction } from "@/actions/editBudget.action"

export default function EditBudgetForm({ budgets }: { budgets: BudgetType }) {
  const router = useRouter()

  const editBudgetActionWhitId = editBudgetAction.bind(null, budgets.id)
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [state, dispatch] = useActionState(editBudgetActionWhitId, {
    errors: [],
    success: ''
  })

  const handleSubmit = () => {
    setSubmitCount(prev => prev + 1)
  }

  useEffect(() => {
    const error = getFieldError("global", state.errors)
    const success = state.success

    /** Avisos */
    if (error) {
      toast.error('Ups! Hubo un Error', {
        description: error,
        duration: 3000,
        icon: <Siren size={24} weight="duotone" />
      })
    }

    if (success) {
      toast.success('Presupuesto Actualizado', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />
      })

      router.push('/dashboard')
    }
  }, [state, router])

  return (
    <form
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
      className="mt-8 px-4 space-y-3 w-full mb-6"
    >
      <BudgetForm errors={state.errors} submitCount={submitCount} budgets={budgets}/>

      <div className="flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Editar Presupuesto"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}