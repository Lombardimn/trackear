import BudgetMenu from "@/components/dashboard/BudgetMenu";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { budgetAPI } from "@/schemas";
import { formatCurrency } from "@/utilities/FormatCurrency.util";
import { formatDate } from "@/utilities/FormatDate.util";
import { getToken } from "@/utilities/getToken.util";
import { DotsThreeOutline, Ghost } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

async function getUserBudgets() {
  const token = await getToken()
  const URL = `${process.env.API_URL}/budgets`

  const req = await fetch(URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const res = await req.json()
  const budgets = budgetAPI.parse(res)
  return budgets
}

export default async function DashboardPage() {

  const budgets = await getUserBudgets()

  return (
    <>
      <section className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
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
      </section>
      <section className="pt-10">
        <Card>
          {
            budgets.length
              ? (
                <>
                  <ul role="list" className=" py-4 divide-y divide-gray-300 w-full px-4">
                    {
                      budgets.map((budget) => (
                        <li key={budget.id} className="flex justify-between gap-x-6 p-5">
                          <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto space-y-2">
                              <p className="text-2xl font-semibold leading-6 text-gray-800">
                                <Link
                                  href={`/dashboard/budgets/${budget.id}`}
                                  className="hover:text-green-600"
                                >
                                  {budget.name}
                                </Link>
                              </p>
                              <p className="text-xl font-bold text-emerald-600">
                                {formatCurrency(Number(budget.amount))}
                              </p>
                              <p className='text-gray-500 text-sm'>
                                Ultima actualizacion:{' '}
                                <span className="font-bold">
                                  {formatDate(budget.updatedAt)}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-x-6">
                            <BudgetMenu budgetId={budget.id} />
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  <Modal />
                </>
              )
              : (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="flex flex-row items-end justify-center">
                    <Ghost size={48} weight="duotone" className="" />
                    <DotsThreeOutline size={24} weight="duotone" />
                  </div>
                  <p className="text-gray-800 text-2xl">
                    No tienes presupuestos creados.
                  </p>
                  <Link
                    href={'/dashboard/budgets/new'}
                    className="text-green-600 hover:text-green-800 hover:underline font-medium pb-4"
                  >
                    Comienza creando uno
                  </Link>
                </div>
              )
          }
        </Card>
      </section>
    </>
  )
}