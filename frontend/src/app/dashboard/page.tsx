import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
      <div className='w-full md:w-auto'>
        <h1 className="font-black text-4xl text-green-500 my-5">Mis Presupuestos</h1>
        <p className="text-xl font-bold text-gray-800">Maneja y administra tus {''}
          <span className="text-green-600">presupuestos</span>
        </p>
      </div>
      <Link
        href={'/dashboard/budgets/new'}
        className="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
      >
        Crear Presupuesto
      </Link>
    </div>
  )
}