import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { verifySession } from "@/guards/dal.guard";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Trackear | Panel de Control"
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = await verifySession()

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="bg-green-50 mt-14 flex-1">
        <div className='max-w-6xl mx-auto py-8'>
          {children}
        </div>
        <Toaster
          position="top-right"
          duration={3000}
          richColors
        />
      </main>
      <Footer />
    </div>
  );
}