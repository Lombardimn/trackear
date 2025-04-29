import Amount from "@/components/charts/Amount"
import ProgressBar from "@/components/charts/ProgressBar"
import AddExpenseButton from "@/components/dashboard/expenses/AddExpenseButton"
import ExpenseMenu from "@/components/dashboard/expenses/ExpenseMenu"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Modal from "@/components/ui/Modal"
import OptionMenuContainer from "@/components/ui/OptionMenuContainer"
import { getBudget } from "@/services/budgets.service"
import { formatCurrency } from "@/utilities/FormatCurrency.util"
import { formatDate } from "@/utilities/FormatDate.util"
import { DotsThreeOutline, Ghost } from "@phosphor-icons/react/dist/ssr"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params
  const budget = await getBudget(id)

  return {
    title: `Trackear | ${budget.name}`,
    description: `Gestión de presupuesto - ${budget.name}`
  }
}

export default async function BudgetPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const budget = await getBudget(id)

  /** Calculo de el total de gastos */
  const totalExpenses = budget.expenses.reduce((
    total,
    expense
  ) => total + Number(expense.amount), 0)

  /** Calculo del saldo disponible */
  const totalAvailable = Number(budget.amount) - totalExpenses

  /** Calculo del porcentaje */
  const percentage = ((totalExpenses / Number(budget.amount)) * 100).toFixed(2)

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-green-500 my-5'>
            {budget.name}
          </h1>
          <p className="text-xl font-bold text-gray-800">Administra tus {''}
            <span className="text-green-600">Gastos</span>
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <AddExpenseButton />

          <Button
            variant
            type="button"
            href={'/dashboard'}
            value="Volver"
            classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-red-500 hover:bg-red-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
          />
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-between gap-4 item py-4">
          <div>
            <ProgressBar percentage={Number(percentage)} />
          </div>
          
          {/** Resultados */}
          <div className="flex flex-col gap-3 justify-center md:items-start ">
            <Amount
              label="Presupuesto"
              amount={budget.amount ? Number(budget.amount) : 0}
              color="blue"
            />

            <Amount
              label="Disponible"
              amount={totalAvailable}
              color="green"
            />

            <Amount
              label="Consumido"
              amount={totalExpenses}
              color="red"
            />
          </div>
        </div>
      </Card>

      <Card>
        {
          budget.expenses.length
            ? (
              <>
                <ul role="list" className=" py-4 divide-y divide-gray-300 w-full px-4">
                  {
                    budget.expenses.map((expense) => (
                      <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto space-y-2">
                            <p className="text-2xl font-semibold leading-6 text-gray-800">
                              {expense.name}
                            </p>
                            <p className="text-xl font-bold text-emerald-600">
                              {formatCurrency(Number(expense.amount))}
                            </p>
                            <p className='text-gray-500 text-sm'>
                              Agregado:{' '}
                              <span className="font-bold">
                                {formatDate(expense.updatedAt)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                          <OptionMenuContainer>
                            <ExpenseMenu expenseId={expense.id} />
                          </OptionMenuContainer>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </>
            )
            : (
              <>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="flex flex-row items-end justify-center">
                    <Ghost size={48} weight="duotone" />
                    <DotsThreeOutline size={24} weight="duotone" />
                  </div>
                  <p className="text-gray-800 text-2xl pt-6">
                    No existen gastos asociados al presupuesto.
                  </p>
                  <p className="text-gray-800 text-xl pt-2">
                    Agrega algunos para comenzar a administrar el presupuesto.
                  </p>
                </div>
              </>
            )
        }
      </Card>

      <Modal />
    </>
  )
}