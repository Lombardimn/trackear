import PaperPlaneAnimation from "@/components/statuses/PaperPlaneAnimation";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function StatusesPage() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <Card >
        <div className="py-10">
          <div className="h-auto w-auto flex items-center justify-center">
            <PaperPlaneAnimation color="#22c55e" trailColor="#18181b" delay={1} speed={5} size={48} />
          </div>
          <div className="text-gray-800 flex flex-col items-center justify-center gap-5 mx-8">
            <h1 className="text-3xl font-bold text-green-500">Correo enviado</h1>
            <p className="text-center text-lg">
              Si la dirección ingresada es correcta, recibirás un correo con un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada o la carpeta de spam.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 mx-8 pt-6">
          <Link
            href="/auth/login"
            className="text-green-600 hover:text-green-800 hover:underline font-medium text-sm pb-4"
          >
            ¿Ya Resolviste el Problema? Inicia sesión
          </Link>
          </div>
        </div>
      </Card>

    </section>
  )
}