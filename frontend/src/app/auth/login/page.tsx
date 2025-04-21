import LoginForm from "@/components/auth/LoginForm";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trackear | Iniciar Sesión"
}

export default function LoginPage() {
  return (
    <>
      <div className="mt-8 px-8 space-y-3 w-full">
        <h1 className="text-6xl font-black text-green-500">Inicia Sesión</h1>
        <p className="text-3xl font-bold text-gray-800">
          y controla tus
          <span className="text-green-600"> finanzas</span>
        </p>
      </div>
      <Card>
        <LoginForm />
        <Link
          href="/auth/forgot-password"
          className="text-green-600 hover:text-green-800 hover:underline font-medium text-sm pb-4"
        >
          ¿Olvidaste tu contraseña? Recuperala
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