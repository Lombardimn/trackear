import { validateToken } from "@/actions/validateToken.action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { SealCheck, Siren } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  mehtod: Dispatch<SetStateAction<boolean>>,
  setToken: Dispatch<SetStateAction<string>>,
  token: string
}

export default function ValidateTokenForm({ mehtod , token, setToken}: Props) {
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const validateTokenInput = validateToken.bind(null, token)
  const [state, dispatch] = useActionState(validateTokenInput, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (isComplete) {
      startTransition(() => {
        dispatch()
      })
    }

    setIsComplete(false)
  }, [isComplete, setToken])

  useEffect(() => {
    /** Avisos */
    if (state.errors && state.errors.length > 0) {
      toast.error('Ups! Hubo un Error', {
        description: state.errors[0],
        duration: 3000,
        icon: <Siren size={24} weight="duotone" />
      })
    }

    if (state.success) {
      toast.success('Cuenta Verificada', {
        description: state.success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />
      })

      mehtod(true)
    }
  }, [state, mehtod])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setTimeout(() => {
      setIsComplete(true)
    }, 500)
  }

  return (
    <div className="flex justify-center gap-5 my-6">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}