"use client"

import { SealCheck, Siren } from "@phosphor-icons/react"
import Button from "../ui/Button"
import { useActionState, useEffect, useState } from "react"
import { createBudgetAction } from "@/actions/createBudget.action"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import BudgetForm from "./BudgetForm"

export default function CreateBudgetForm() {
  const router = useRouter()

  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [state, dispatch] = useActionState(createBudgetAction, {
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
      toast.success('Cuenta Verificada', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />,
        onAutoClose: () => router.push('/dashboard')
      })
    }
  }, [state, router])

  return (
    <form
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
      className="mt-8 px-4 space-y-3 w-full mb-6"
    >
      <BudgetForm errors={state.errors} submitCount={submitCount} />

      <div className="flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Crear Presupuesto"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}