import Button from "@/components/ui/Button"
import ExpenseForm from "./ExpenseForm"
import { DialogTitle } from "@headlessui/react"
import createExpensesAction from "@/actions/createExpenses.action"
import { useActionState, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getFieldError } from "@/utilities/getFieldError.util"
import { SealCheck, Siren } from "@phosphor-icons/react"
import { toast } from "sonner"

export default function AddExpenseForm({ closeModal }: { closeModal: () => void }) {
  const { id } = useParams()

  const createExpensesWhitBudgetId = createExpensesAction.bind(null, Number(id))
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [state, dispatch] = useActionState(createExpensesWhitBudgetId, {
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
      toast.success('Gasto registrado', {
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
        Registrar un Gasto
      </DialogTitle>
      <p className="text-xl font-bold text-gray-800">Llena el formulario y crea un {''}
        <span className="text-green-600">Consumo</span>
      </p>

      <form
        noValidate
        action={dispatch}
        onSubmit={handleSubmit}
        className="mt-8 px-4 space-y-3 w-full mb-6"
      >
        <ExpenseForm errors={state.errors} submitCount={submitCount} />

        <div className="flex md:flex-row md:justify-end md:gap-5 flex-col justify-center items-center">
          <div className="pb-6 flex flex-col items-center justify-center">
            <Button
              type="submit"
              value="Agregar Gasto"
              method={() => { }}
              classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            />
          </div>
          <div className="pb-6 flex flex-col items-center justify-center">
            <Button
              variant
              type="button"
              href={'/dashboard'}
              value="Cancelar"
              classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-red-500 hover:bg-red-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            />
          </div>

        </div>
      </form>
    </>
  )
}