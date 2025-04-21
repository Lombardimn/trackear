import RegisterForm from "@/components/auth/RegisterForm";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trackear | Crear Cuenta"
}

export default function RegisterPage() {
  return (
    <>
      <div className="pt-4 px-8 space-y-3 w-full">
        <h1 className="text-6xl font-black text-green-500">Crea una Cuenta</h1>
        <p className="text-3xl font-bold text-gray-800">
          y controla tus
          <span className="text-green-600"> finanzas</span>
        </p>
      </div>

      <Card>
        <RegisterForm />
        <Link
          href="/auth/login"
          className="text-green-600 hover:text-green-800 hover:underline font-medium text-sm pb-4"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-green-600 hover:text-green-800 hover:underline font-medium text-sm pb-4"
        >
          ¿Olvidaste tu contraseña? Recuperala
        </Link>
      </Card>
    </>
  )
}