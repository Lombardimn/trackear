"use client"

import { Envelope, SealCheck, Siren } from "@phosphor-icons/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useActionState, useEffect, useState } from "react";
import { forgotPassword } from "@/actions/forgotPassword.action";
import { getFieldError } from "@/utilities/getFieldError.util";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter()
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [state, dispatch] = useActionState(forgotPassword, {
    errors: [],
    success: ''
  })

  /** Manejo de visualización de errores en el formulario*/
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

    if (success !== '') {
      toast.success('Petició́n Exitosa', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />,
        onAutoClose: () => {
          router.push('/statuses')
        }
      })

      setSubmitCount(0)
    }
  }, [state, router])

  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
    >
      <div className="pb-5">
        <Input
          type="email"
          placeholder="Email de Registro"
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          error={getFieldError("email", state.errors)}
          submitCount={submitCount}
          icon={<Envelope size={24} color="inherit" weight="duotone" />}
        />

        <div className="py-5 flex flex-col items-center justify-center">
          <Button
            type="submit"
            value="Solicitar"
            method={() => { }}
            classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
          />
        </div>
      </div>
    </form>
  )
}