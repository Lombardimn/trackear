"use client"

import Button from "@/components/ui/Button";
import { ExpenseType } from "@/schemas";
import { MenuItem } from "@headlessui/react";
import { Pen, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function ExpenseMenu({ expenseId }: { expenseId: ExpenseType['id'] }) {
  const router = useRouter()
  return (
    <>
      <MenuItem>
        <Button
          type="button"
          value="Editar Gasto"
          classname='flex gap-2 px-3 py-1 text-sm leading-6 !text-gray-800 bg-transparent hover:bg-transparent'
          icon={<Pen size={24} weight="duotone" />}
          method={() => {
            router.push(location.pathname + `?showModal=true&editExpenseId=${expenseId}`)
          }}
        />
      </MenuItem>

      <MenuItem>
        <Button
          type="button"
          value="Eliminar Gasto"
          classname="flex gap-2 px-3 py-1 text-sm leading-6 !text-red-500 bg-transparent hover:bg-transparent"
          icon={<Trash size={24} weight="duotone" />}
          method={() => {
            router.push(location.pathname + `?showModal=true&deleteExpenseId=${expenseId}`)
          }}
        />
      </MenuItem>
    </>
  )
}