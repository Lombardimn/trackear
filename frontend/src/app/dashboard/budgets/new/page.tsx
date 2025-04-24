import CreateBudgetForm from "@/components/dashboard/CreateBudgetForm";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function CreateBudgetPage() {
  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-green-500 my-5'>
            Nuevo Presupuesto
          </h1>
          <p className="text-xl font-bold text-gray-800">Llena el formulario y crea un nuevo {''}
            <span className="text-green-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={'/dashboard'}
          className='bg-green-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center hover:bg-green-600'
        >
          Volver
        </Link>
      </div>

      <Card>
        <CreateBudgetForm />
      </Card>
    </>
  )
}