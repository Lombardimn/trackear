"use client"

import { Lock, SealCheck, Siren } from "@phosphor-icons/react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useActionState, useEffect, useRef, useState } from "react";
import { updatePasswordAction } from "@/actions/updatePassword.action";
import { getFieldError } from "@/utilities/getFieldError.util";
import { toast } from "sonner";
import { logoutUserAction } from "@/actions/logoutUser.action";

export default function ChangePasswordForm() {
  const ref = useRef<HTMLFormElement>(null)

  const [submitCount, setSubmitCount] = useState(0)
  const [state, dispatch] = useActionState(updatePasswordAction, {
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
      toast.success('Contraseña Actualizada', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />,
        onAutoClose: () => {
          if (ref.current) {
            ref.current.reset()
          }

          logoutUserAction()
        }
      })
    }
  }, [state])

  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
      ref={ref}
    >
      <div className="pb-6">
        <Input
          type="password"
          placeholder="*************"
          id="current_password"
          name="current_password"
          label="Contraseña Actual"
          error={getFieldError("current_password", state.errors)}
          submitCount={submitCount}
          icon={<Lock size={24} color="inherit" weight="duotone" />}
          variant
        />
      </div>

      <div className="pb-6">
        <Input
          type="password"
          placeholder="*************"
          id="password"
          name="password"
          label="Nueva Contraseña"
          error={getFieldError("password", state.errors)}
          submitCount={submitCount}
          icon={<Lock size={24} color="inherit" weight="duotone" />}
          variant
        />
      </div>

      <div className="pb-6">
        <Input
          type="password"
          placeholder="*************"
          id="password_confirmation"
          name="password_confirmation"
          label="Confirmar Contraseña"
          error={getFieldError("password_confirmation", state.errors)}
          submitCount={submitCount}
          icon={<Lock size={24} color="inherit" weight="duotone" />}
          variant
        />
      </div>

      <div className="pb-6 flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Cambiar Contraseña"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>

    </form>
  )
}
