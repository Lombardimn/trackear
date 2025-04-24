import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trackear | Recuperar contraseña"
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="pt-4 px-8 space-y-3 w-full">
        <h1 className="text-6xl font-black text-green-500">¿Olvidaste tu contraseña?</h1>
        <p className="text-3xl font-bold text-gray-800">
          Aquí puedes
          <span className="text-green-600"> Reestablecerla</span>
        </p>
      </div>
      <Card>
        <ForgotPasswordForm />
        <Link
          href="/auth/login"
          className="text-green-600 hover:text-green-800 hover:underline font-medium text-sm pb-4"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
        <Link
          href="/auth/register"
          className="text-green-600 hover:text-green-800 hover:underline font-medium text-sm pb-4"
        >
          ¿No tienes cuenta? Registrate
        </Link>
      </Card>
    </>
  )
}