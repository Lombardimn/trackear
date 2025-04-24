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
    <main className="min-h-screen bg-green-50">
      <Header user={user} />

      <section className='max-w-6xl mx-auto py-8'>
        {children}
      </section>
      <Toaster
        position="top-right"
        duration={3000}
        richColors
      />

      <Footer />
    </main>
  );
}