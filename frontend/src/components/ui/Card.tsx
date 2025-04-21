export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center mx-8 mb-8 mt-4 bg-white rounded-2xl shadow-md h-auto">
      {children}
    </div>
  )
}