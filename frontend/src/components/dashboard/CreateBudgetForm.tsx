"use client"

import { Invoice, PiggyBank, SealCheck, Siren } from "@phosphor-icons/react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useActionState, useEffect, useState } from "react"
import { createBudgetAction } from "@/actions/createBudget.action"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
      <div className="pb-6">
        <Input
          type="text"
          placeholder="Nombre del presupuesto"
          id="name"
          name="name"
          label="Nombre del presupuesto"
          error={getFieldError("name", state.errors)}
          submitCount={submitCount}
          icon={<Invoice size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6">
        <Input
          type="number"
          placeholder="$ 0.00"
          id="amount"
          name="amount"
          label="Monto"
          error={getFieldError("amount", state.errors)}
          submitCount={submitCount}
          icon={<PiggyBank size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Registrarse"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}