import Input from "../ui/Input";
import { Lock, SealCheck, Siren } from "@phosphor-icons/react";
import Button from "../ui/Button";
import { useActionState, useEffect, useState } from "react";
import { resetPasswordAction } from "@/actions/resetPassword.action";
import { getFieldError } from "@/utilities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos

  const resetPasswordActionWhitToken = resetPasswordAction.bind(null, token)
  const [state, dispatch] = useActionState(resetPasswordActionWhitToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    const error = getFieldError("global", state.errors)
    const success = state.success

    /** Avisos */
    if (state.errors && state.errors.length > 0) {
      toast.error('Ups! Hubo un Error', {
        description: error,
        duration: 3000,
        icon: <Siren size={24} weight="duotone" />
      })
    }

    if (success) {
      toast.success('Cuenta Verificada', {
        description: success,
        duration: 3000,
        icon: <SealCheck size={24} weight="duotone" />,
        onAutoClose: () => router.push('/auth/login')
      })
    }
  }, [state, router])

  const handleSubmit = () => {
    setSubmitCount(prev => prev + 1)
  }

  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
      onSubmit={handleSubmit}
      action={dispatch}
    >
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
          value="Resetear Contraseña"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  );
}