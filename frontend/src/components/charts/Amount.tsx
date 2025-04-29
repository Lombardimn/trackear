import { formatCurrency } from "@/utilities/FormatCurrency.util";

type ColorType = 'blue' | 'green' | 'red' | 'yellow'

interface AmountProps<T extends ColorType> {
  label: string,
  amount: number,
  color?: T
}

export default function Amount({ label, amount, color }: AmountProps<ColorType>) {
  return (
    <div className="flex flex-row items-center p-3 rounded-xl bg-neutral-50 shadow-md">
      <p className="text-2xl font-bold text-gray-800">
        {label}:{' '}
        <span
          className={`
            ${color === 'blue' && 'text-blue-600 bg-blue-50'}
            ${color === 'green' && 'text-green-600 bg-green-50'}
            ${color === 'red' && 'text-red-600 bg-red-50'}
            ${color === 'yellow' && 'text-yellow-600 bg-yellow-50'}
            rounded-md p-0.5
          `}
        >
          {
            amount <= 0
              ? '$ 0,00'
              : formatCurrency(amount)
          }
        </span>
      </p>
    </div>
  )
}