import { getFieldError } from "@/utilities/getFieldError.util";
import Input from "../ui/Input";
import { Invoice, PiggyBank } from "@phosphor-icons/react";
import { BudgetType } from "@/schemas";

export default function BudgetForm({
  errors,
  submitCount,
  budgets
}: {
  errors: {
    path: string;
    message: string;
  }[],
submitCount: number,
 budgets?: BudgetType
}) {
  return (
    <>
      <div className="pb-6">
        <Input
          type="text"
          placeholder="Nombre del presupuesto"
          id="name"
          name="name"
          label="Nombre del presupuesto"
          error={getFieldError("name", errors)}
          submitCount={submitCount}
          defaultValue={budgets?.name}
          icon={<Invoice size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-6">
        <Input
          type="number"
          placeholder="$ 0.00"
          id="amount"
          name="amount"
          label="Monto"
          error={getFieldError("amount", errors)}
          submitCount={submitCount}
          defaultValue={budgets?.amount}
          icon={<PiggyBank size={24} color="inherit" weight="duotone" />}
        />
      </div>
    </>
  )
}