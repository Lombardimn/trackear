"use client"

import Input from "@/components/ui/Input"
import { Envelope, Lock, Siren } from "@phosphor-icons/react"
import Button from "@/components/ui/Button"
import { authenticateUser } from "@/actions/authenticateUser.action"
import { useActionState, useEffect, useState } from "react"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"

export default function LoginForm() {
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [state, dispatch] = useActionState(authenticateUser, {
    errors: []
  })

  /** Manejo de visualización de errores en el formulario */
  const handleSubmit = () => {
    setSubmitCount(prev => prev + 1)
  }

  useEffect(() => {
    const error = getFieldError("global", state.errors)
    
    /** Avisos */
    if (error) {
      toast.error('Ups! Hubo un Error',{
        description: error,
        duration: 3000,
        icon: <Siren size={24} weight="duotone" />
      })
    }

    if (error?.length === 0) {
      setSubmitCount(0)
    }
  }, [state])


  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      action={dispatch}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="pb-5">
        <Input
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          error={getFieldError("email", state.errors)}
          submitCount={submitCount}
          icon={<Envelope size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-5">
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

      <div className="pb-5 flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Iniciar Sesión"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}