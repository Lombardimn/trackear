"use client"

import { startTransition, useActionState, useEffect, useState } from "react"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { SealCheck, Siren } from "@phosphor-icons/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { confirmAccount } from "@/actions/confirmAccount.action"

export default function ConfirmAccountForm() {
  const router = useRouter()

  const [token, setToken] = useState<string>('')
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if(isComplete) {
      startTransition(() => {
        dispatch()
      })
    }

    /** Avisos */
    if (state.errors && state.errors.length > 0) {
      toast.error('Ups! Hubo un Error',{
        description: state.errors[0],
        duration: 3000,
        icon: <Siren size={24} weight="duotone" />
      })
    }

    if (state.success) {
      toast.success('Cuenta Verificada',{
        description: state.success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />,
        onAutoClose: () => {
          router.push('/auth/login')
        }
      })
    }

    setIsComplete(false)
    setToken('')
  }, [isComplete, state, router])

  /** Actualiza el token en la carga */
  const HandleChange = (token: string) => {
    setToken(token)
  }

  /** Ejecuta la verificación de forma automática una vez se completa el token */
  const handleComplete = () => {
    setTimeout(() => {
      setIsComplete(true)
    }, 500)
  }

  return (
    <div className="flex justify-center gap-5 my-6">
      <PinInput
        value={token}
        onChange={HandleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="w-10 h-10 text-center border border-gray-300 placeholder-white bg-white rounded-lg shadow-md"/>
        <PinInputField className="w-10 h-10 text-center border border-gray-300 placeholder-white bg-white rounded-lg shadow-md"/>
        <PinInputField className="w-10 h-10 text-center border border-gray-300 placeholder-white bg-white rounded-lg shadow-md"/>
        <PinInputField className="w-10 h-10 text-center border border-gray-300 placeholder-white bg-white rounded-lg shadow-md"/>
        <PinInputField className="w-10 h-10 text-center border border-gray-300 placeholder-white bg-white rounded-lg shadow-md"/>
        <PinInputField className="w-10 h-10 text-center border border-gray-300 placeholder-white bg-white rounded-lg shadow-md"/>
      </PinInput>
    </div>
  )
}