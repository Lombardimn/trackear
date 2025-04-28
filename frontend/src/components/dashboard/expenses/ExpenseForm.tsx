import Input from "@/components/ui/Input";
import { getFieldError } from "@/utilities/getFieldError.util";
import { HandCoins, ReceiptX } from "@phosphor-icons/react";

export default function ExpenseForm({
  errors,
  submitCount,
  expenses
}: {
  errors: {
    path: string;
    message: string;
  }[],
submitCount: number,
 expenses?: any
}) {
  return (
    <>
      <div className="pb-6">
        <Input
          type="text"
          placeholder="Referencia del gasto"
          id="name"
          name="name"
          label="Nombre del registro"
          error={getFieldError("name", errors)}
          submitCount={submitCount}
          //defaultValue={expenses?.name}
          icon={<ReceiptX size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6">
        <Input
          type="number"
          placeholder="$ 0.00"
          id="amount"
          name="amount"
          label="Costo"
          error={getFieldError("amount", errors)}
          submitCount={submitCount}
          //defaultValue={expenses?.amount}
          icon={<HandCoins size={24} color="inherit" weight="duotone" />}
        />
      </div>
    </>
  )
}