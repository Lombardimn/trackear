import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import Button from "@/components/ui/Button";
import deleteExpenseAction from "@/actions/deleteExpense.action";
import { startTransition, useActionState, useEffect } from "react";
import { getFieldError } from "@/utilities/getFieldError.util";
import { SealCheck, Siren } from "@phosphor-icons/react";
import { toast } from "sonner";

type DeleteExpenseForm = {
  closeModal: () => void
}

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const searchParams = useSearchParams()
  const { id: budgetId } = useParams()
  const expenseId = searchParams.get('deleteExpenseId')!

  const deleteExpenseActionWhitId = deleteExpenseAction.bind(null, {
    budgetId: Number(budgetId),
    expenseId: Number(expenseId)
  })

  const [state, dispatch] = useActionState(deleteExpenseActionWhitId, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (!Number.isInteger(Number(expenseId)) || !Number.isInteger(Number(budgetId))) {
      closeModal()      
    }
  }, [closeModal, budgetId, expenseId])
  
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
      toast.success('Gasto eliminado con exito', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />,
        onAutoClose: () => closeModal()
      })
    }
  }, [closeModal, state])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-green-500 mb-4"
      >
        Eliminar un Gasto
      </DialogTitle>
      <p className="text-xl font-bold text-gray-800">
        Confirmala accion y elimina el{' '}
        <span className="text-green-600">
          Gasto
        </span>
      </p>
      <p className='text-gray-600 text-sm'>
        (Un gasto eliminado no se puede recuperar)
      </p>

      <div className="flex md:flex-row md:justify-end md:gap-5 flex-col justify-center items-center">
        <div className="pb-6 flex flex-col items-center justify-center">
          <Button
            type="button"
            value="Eliminar Gasto"
            classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            method={() => startTransition(() => dispatch())}
          />
        </div>

        <div className="pb-6 flex flex-col items-center justify-center">
          <Button
            type="button"
            value="Cancelar"
            classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-red-500 hover:bg-red-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            method={closeModal}
          />
        </div>
      </div>
    </>
  )
}