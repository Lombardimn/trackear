"use client"

import { BudgetType } from '@/schemas'
import { MenuItem } from '@headlessui/react'
import { Pen, Receipt, Trash } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'


export default function BudgetMenu({ budgetId }: { budgetId: BudgetType['id'] }) {
  const router = useRouter()

  return (
    <>
      <MenuItem>
        <Button
          variant
          type='button'
          value='Ver Presupuesto'
          icon={<Receipt size={24} weight="duotone" />}
          href={`/dashboard/budgets/${budgetId}`}
          classname='flex gap-2 px-3 py-1 text-sm leading-6 !text-gray-800 bg-transparent hover:bg-transparent'
        />
      </MenuItem>

      <MenuItem>
        <Button
          variant
          type='button'
          value='Editar Presupuesto'
          icon={<Pen size={24} weight="duotone" />}
          href={`/dashboard/budgets/${budgetId}/edit`}
          classname='flex gap-2 px-3 py-1 text-sm leading-6 !text-gray-800 bg-transparent hover:bg-transparent'
        />
      </MenuItem>

      <MenuItem>
        <Button
          type="button"
          value="Eliminar Presupuesto"
          classname="flex gap-2 px-3 py-1 text-sm leading-6 !text-red-500 bg-transparent hover:bg-transparent"
          icon={<Trash size={24} weight="duotone" />}
          method={() => router.push(`?deleteBudgetId=${budgetId}&showModal=true`)}
        />
      </MenuItem>

    </>
  )
}
