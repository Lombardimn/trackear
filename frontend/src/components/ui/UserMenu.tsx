"use client"

import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Files, IdentificationBadge, List, XCircle } from '@phosphor-icons/react'
import { UserType } from '@/schemas'
import { Fragment } from 'react'
import Button from './Button'
import Link from 'next/link'
import { logoutUserAction } from '@/actions/logoutUser.action'

export default function UserMenu({user}: {user: UserType}) {

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-green-500 hover:bg-green-800">
        <List size={24} weight="bold" className='text-white' />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-3 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-800 shadow-lg ring-1 ring-gray-900/5">
            <p className='p-2'>
              Hola:{' '}
              <span className='text-green-600 text-xl font-semibold ml-2'>
                @{user.name}
              </span>
            </p>
            <Link
              href='/dashboard/profile/settings'
              className='flex flex-row items-center gap-2 p-2 hover:text-green-600'
            >
              <IdentificationBadge size={24} weight="duotone" />
              Mi Perfil
            </Link>
            <Link
              href='/dashboard'
              className='flex flex-row items-center gap-2 p-2 hover:text-green-600'
            >
              <Files size={24} weight="duotone" />
              Mis Presupuestos
            </Link>
            <Button
              type='button'
              value='Cerrar Sesión'
              classname='w-auto p-2 rounded-2xl flex flex-row items-center justify-center gap-2 bg-transparent hover:bg-transparent hover:!text-green-600 !text-sm !text-gray-800 !shadow-none'
              icon={<XCircle size={24} weight="duotone" />}
              method={ async () => {
                await logoutUserAction()
              }}
            />
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
