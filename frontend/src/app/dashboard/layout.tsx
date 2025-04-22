import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { verifySession } from "@/guards/dal.guard";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = await verifySession()

  return (
    <main className="min-h-screen">
      <Header user={user} />

      <section className='max-w-6xl mx-auto py-8'>
        {children}
      </section>
      {/* <ToastNotification /> */}

      <Footer />
    </main>
  );
}