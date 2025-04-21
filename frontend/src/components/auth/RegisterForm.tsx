"use client"

import { Envelope, Lock, User } from "@phosphor-icons/react/dist/ssr";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Register } from "@/actions/createAccount.action";
import { useActionState, useEffect, useRef, useState } from "react";
import { getFieldError } from "@/utilities";
import { toast } from 'sonner';
import { SealCheck, Siren } from "@phosphor-icons/react";

export default function RegisterForm() {
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [state, dispatch] = useActionState(Register, {
    errors: [],
    success: ""
  })

  /** Referencia del formulario */
  const ref = useRef<HTMLFormElement>(null)

   // Manejo de visualización de errores en el formulario
   const handleSubmit = () => {
    setSubmitCount(prev => prev + 1)
  }

  useEffect(() => {
    const error = getFieldError("global", state.errors)
    const success = state.success
    
    /** Avisos */
    if (error) {
      toast.error('Ups! Hubo un Error',{
        description: error,
        duration: 5000,
        icon: <Siren size={24} weight="duotone" />
      })
    }

    if (success) {
      ref.current?.reset()

      toast.success('Registrado Exitosamente', {
        description: success,
        duration: 5000,
        icon: <SealCheck size={24} weight="duotone" />
      })

      setSubmitCount(0)
    }
  }, [state]);

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
      </div>

      <div className="pb-6">
        <Input
          type="text"
          placeholder="Nombre de Registro"
          id="username"
          name="username"
          label="Nombre de Usuario"
          autoComplete="username"
          error={getFieldError("username", state.errors)}
          submitCount={submitCount}
          icon={<User size={24} color="inherit" weight="duotone" />}
        />
      </div>

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
          value="Registrarse"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}