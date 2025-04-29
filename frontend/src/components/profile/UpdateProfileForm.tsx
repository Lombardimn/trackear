"use client"

import { UserType } from "@/schemas"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { useActionState, useEffect, useState } from "react"
import { Envelope, SealCheck, Siren, User } from "@phosphor-icons/react"
import { updateUserAction } from "@/actions/updateUser.action"
import { getFieldError } from "@/utilities/getFieldError.util"
import { toast } from "sonner"

export default function UpdateProfileForm({ user }: {user: UserType} ) {
  const [submitCount, setSubmitCount] = useState(0)
  const [state, dispatch] = useActionState(updateUserAction, {
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
        icon: <SealCheck size={24} weight="duotone" />
      })
    }
  }, [state])

  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
    >
      <div className="pb-6">
        <Input
          type="text"
          placeholder="Nombre de Registro"
          id="name"
          name="name"
          label="Nombre de Usuario"
          autoComplete="name"
          defaultValue={user.name}
          error={getFieldError("name", state.errors)}
          submitCount={submitCount}
          icon={<User size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6">
        <Input
          type="email"
          placeholder="Email de Registro"
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          defaultValue={user.email}
          error={getFieldError("email", state.errors)}
          submitCount={submitCount}
          icon={<Envelope size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6 flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Guardar Cambios"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}