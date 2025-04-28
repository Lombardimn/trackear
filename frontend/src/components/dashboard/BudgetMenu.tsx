"use client"

import { BudgetType } from '@/schemas'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { DotsThreeOutlineVertical, Pen, Receipt, Trash } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'


export default function BudgetMenu({ budgetId }: { budgetId: BudgetType['id'] }) {
  const router = useRouter()

  return (
    <>
      <Menu as="div" className="relative flex-none">
        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">opciones</span>
          <DotsThreeOutlineVertical size={24} weight="duotone" />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <MenuItem>
              <Link
                href={`/dashboard/budgets/${budgetId}`}
                className='flex gap-2 px-3 py-1 text-sm leading-6 text-gray-800'
              >
                <Receipt size={24} weight="duotone" />
                Ver Presupuesto
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={`/dashboard/budgets/${budgetId}/edit`}
                className='flex gap-2 px-3 py-1 text-sm leading-6 text-gray-800'
              >
                <Pen size={24} weight="duotone" />
                Editar Presupuesto
              </Link>
            </MenuItem>

            <MenuItem>
              <button
                type='button'
                className='flex gap-2 px-3 py-1 text-sm leading-6 text-red-500'
                onClick={ () => router.push(`?deleteBudgetId=${budgetId}`) }
              >
                <Trash size={24} weight="duotone" />
                Eliminar Presupuesto
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </>
  )
}
