import Logo from "@/components/ui/Logo"
import { Toaster } from 'sonner';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main className="lg:grid lg:grid-cols-2 lg:min-h-screen overflow-y-hidden bg-green-50">
        <div className="flex justify-center bg-zinc-950 lg:bg-[url('/auth_bg.png')] lg:bg-size-[25rem] lg:bg-bottom-left lg:bg-no-repeat">
          <div className="h-28 w-60">
            <Logo />
          </div>
        </div>
        <div className="max-w-3xl">
          {children}
          <Toaster
            position="top-right"
            duration={3000}
            richColors
          />
        </div>
      </main>
    </>
  )
}