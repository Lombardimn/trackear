import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className='bg-zinc-950 absolute top-0 w-full'>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6">
          <div className='w-44 h-20'>
            <Logo />
          </div>
          <nav className="flex gap-5 mt-4 lg:mt-0">
            <Link href="/auth/login" className="text-green-500 font-semibold hover:text-green-300 transition uppercase text-sm">
              Iniciar Sesión
            </Link>
            <Link href="/auth/register" className="text-green-500 font-semibold hover:text-green-300 transition uppercase text-sm">
              Registrarme
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        <section className="text-center space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-green-700 leading-tight">
            Trackear: Domina tus Finanzas
          </h1>
          <p className="text-xl text-gray-800">
            Controla tus ingresos y egresos de forma <span className="text-green-800 font-bold">inteligente y segura</span>. Tu camino hacia la libertad financiera empieza aquí.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              href="/auth/register"
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-800 transition"
            >
              Comenzar Gratis
            </Link>
            <Link
              href="/auth/login"
              className="text-green-950 font-semibold py-3 px-6 border border-green-950 rounded-full hover:bg-green-100 shadow-lg transition"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="space-y-10">
          <h2 className="text-4xl font-bold text-green-700 text-center">¿Por qué elegir CashTrackr?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: "📊 Organización sin Esfuerzo",
                desc: "Clasifica y visualiza tus gastos con una interfaz clara y fácil de usar.",
              },
              {
                title: "🎯 Presupuestos Inteligentes",
                desc: "Establece metas realistas y haz seguimiento con herramientas automáticas.",
              },
              {
                title: "🌍 Accede desde donde quieras",
                desc: "Usá la plataforma desde cualquier dispositivo, estés donde estés.",
              },
              {
                title: "🔒 Seguridad Garantizada",
                desc: "Protegemos tus datos con cifrado y estándares de nivel bancario.",
              },
            ].map(({ title, desc }, i) => (
              <div key={i} className="bg-white shadow-md rounded-xl p-6 space-y-2">
                <h3 className="text-lg font-bold text-emerald-800">{title}</h3>
                <p className="text-gray-800">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Trackear. Todos los derechos reservados.</span>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/auth/register">Crear cuenta</Link>
            <Link href="/auth/login">Iniciar sesión</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
