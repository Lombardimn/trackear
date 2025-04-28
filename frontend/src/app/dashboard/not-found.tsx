import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='space-y-5 text-center pt-4'>
      <h1 className="font-black text-4xl text-green-600">404 | No Encontrado</h1>
      <p className="text-xl font-semibold text-gray-800">
        El Presupuesto al que intentas acceder {''}
        <span className="text-green-600 font-black">
          no existe
        </span>
      </p>

      <div className='flex flex-col items-center'>
        <Image
          src="/404.svg"
          alt="404"
          width={400}
          height={400}
          priority
          className="w-[450px] h-auto"
        />

        <Link
          href="/dashboard"
          className='bg-green-500 hover:bg-green-800 px-10 py-2 rounded-lg text-white font-bold cursor-pointer inline-block'
        >
          Ir a Presupuestos
        </Link>
      </div>
    </div>
  )
}