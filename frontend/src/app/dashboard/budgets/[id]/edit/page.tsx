import EditBudgetForm from "@/components/dashboard/EditBudgetForm"
import Card from "@/components/ui/Card"
import { getBudget } from "@/services/budgets.service"
import { Metadata } from "next"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params
  const budget = await getBudget(id)

  return {
    title: `Trackear | Edición de: ${budget.name}`,
    description: `Edición de presupuesto - ${budget.name}`
  }
}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const budget = await getBudget(id)

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-green-500 my-5'>
            Editar Presupuesto:{' '}
            <span className="text-green-800">{budget.name}</span>
          </h1>
          <p className="text-xl font-bold text-gray-800">Edita el formulario y actualiza{' '}
            <span className="text-green-500">el presupuesto</span>
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
        <EditBudgetForm budgets={budget} />
      </Card>
    </>
  )
}