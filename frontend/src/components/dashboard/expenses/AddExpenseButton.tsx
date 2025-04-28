"use client"

import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"

export default function AddExpenseButton() {
  const router = useRouter()
  return (
    <Button
      type="button"
      classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-green-500 hover:bg-green-800 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
      method={() => {
        router.push(location.pathname + '?addExpense=true&showModal=true')
      }}
    >
      Agregar Gasto
    </Button>
  )
}