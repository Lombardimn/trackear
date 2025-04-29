"use client"

import { DialogTitle } from "@headlessui/react"
import ExpenseForm from "./ExpenseForm"
import Button from "@/components/ui/Button"
import { useParams, useSearchParams } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"
import { SealCheck, Siren } from "@phosphor-icons/react"
import { editExpenseAction } from "@/actions/editExpense.action"
import { ExpenseTypeFromAPI } from "@/schemas"

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  /** Obtener los parámetros */
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('editExpenseId')!

  /** Manejo de estados */
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [expense, setExpense] = useState<ExpenseTypeFromAPI>()

  /** Seleccionamos la acción */
  const editExpenseActionWhitId = editExpenseAction.bind(null, {
    budgetId: Number(budgetId),
    expenseId: Number(expenseId)
  })
  const [state, dispatch] = useActionState(editExpenseActionWhitId, {
    errors: [],
    success: ''
  })

  const handleSubmit = () => {
    setSubmitCount(prev => prev + 1)
  }

  /** Obtenemos los datos del gasto mediante una API Interna */
  useEffect(() => {
    const URL = `${process.env.NEXT_PUBLIC_URL}/dashboard/api/budgets/${budgetId}/expenses/${expenseId}`

    fetch(URL)
      .then(res => res.json())
      .then(data => setExpense(data))
  
  }, [budgetId, expenseId])

  /** Manejo de los avisos */
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
      toast.success('Gasto Editado', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />
      })
      closeModal()
    }
  }, [state, closeModal])
  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-green-500 mb-4"
      >
        Editar un Gasto
      </DialogTitle>
      <p className="text-xl font-bold text-gray-800">Edita el formulario y ajusta tu {''}
        <span className="text-green-600">Consumo</span>
      </p>

      <form
        noValidate
        action={dispatch}
        onSubmit={handleSubmit}
        className="mt-8 px-4 space-y-3 w-full mb-6"
      >
        <ExpenseForm errors={state.errors} submitCount={submitCount} expenses={expense} />

        <div className="flex md:flex-row md:justify-end md:gap-5 flex-col justify-center items-center">
          <div className="pb-6 flex flex-col items-center justify-center">
            <Button
              type="submit"
              value="Editar Gasto"
              method={() => { }}
              classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            />
          </div>
          <div className="pb-6 flex flex-col items-center justify-center">
            <Button
              variant
              type="button"
              href={`/dashboard/budgets/${budgetId}`}
              value="Cancelar"
              classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-red-500 hover:bg-red-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            />
          </div>

        </div>
      </form>
    </>
  )
}