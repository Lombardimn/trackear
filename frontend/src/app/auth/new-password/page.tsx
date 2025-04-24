import PasswordResetHandler from "@/components/auth/PasswordResetHandler";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trackear | Reestablece tu contraseña"
}

export default function NewPasswordPage() {
  return (
    <>
      <div className="pt-4 px-8 space-y-3 w-full">
        <h1 className="text-6xl font-black text-green-500">Reestablece tu Password</h1>
        <p className="text-3xl font-bold text-gray-800">
        Ingresa el código que recibiste{' '}
          <span className="text-green-600">por email</span>
        </p>
      </div>

      <PasswordResetHandler />
    </>
  )
}