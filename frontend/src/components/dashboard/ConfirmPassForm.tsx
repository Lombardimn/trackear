"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import Input from "../ui/Input"
import { Lock, SealCheck, Siren } from "@phosphor-icons/react"
import Button from "../ui/Button"
import { useActionState, useCallback, useEffect, useState } from "react"
import { deleteBudgetAction } from "@/actions/deleteBudget.actions"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"

export default function ConfirmPasswordForm() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

    const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos

  /** Recuperar ID del presupuesto a eliminar  */
  const budgetId = Number(searchParams.get('deleteBudgetId')!)

  const deleteBudgetActionWhitBudgetId = deleteBudgetAction.bind(null, budgetId)
  const [state, dispatch] = useActionState(deleteBudgetActionWhitBudgetId, {
    errors: [],
    success: ''
  })

  /** Manejo del cierre de modal */
  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    Array.from(params.entries()).forEach(([key]) => {
      params.delete(key)
    })
    
    router.replace(`${pathname}?${params}`)
  }, [searchParams, pathname, router])

  /** Manejo de envíos */
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
      toast.success('Presupuesto Eliminado', {
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
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold text-gray-800">Ingresa tu Password para {''}
        <span className="text-green-600">eliminar el presupuesto {''}</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un presupuesto eliminado y sus gastos no se pueden recuperar)</p>
      <form
        className="mt-8 px-4 space-y-3 w-full"
        noValidate
        action={dispatch}
        onSubmit={handleSubmit}
      >
        <div className="pb-6">
          <Input
            type="password"
            placeholder="*************"
            id="password"
            name="password"
            label="Contraseña"
            error={getFieldError("password", state.errors)}
            submitCount={submitCount}
            icon={<Lock size={24} color="inherit" weight="duotone" />}
            variant
          />
        </div>

        <div className="flex md:flex-row md:justify-end md:gap-5 flex-col justify-center items-center">
          <div className="pb-6 flex flex-col items-center justify-center">
            <Button
              type="submit"
              value="Eliminar Presupuesto"
              method={() => { }}
              classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            />
          </div>
          <div className="pb-6 flex flex-col items-center justify-center">
            <Button
              type="button"
              value="Cancelar"
              method={closeModal}
              classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-red-500 hover:bg-red-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
            />
          </div>
        </div>
      </form>

    </>
  )
}
