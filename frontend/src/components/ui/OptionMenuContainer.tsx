"use client"

import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react"
import { DotsThreeOutlineVertical } from "@phosphor-icons/react"
import { Fragment } from "react"

export default function OptionMenuContainer({ children }: Readonly<{ children: React.ReactNode }>) {
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
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  </>
  )
}