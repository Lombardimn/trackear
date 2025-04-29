import TabsNavigation from "@/components/ui/TabsNavigation";
import { Fingerprint, User } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Trackear | Perfil de Usuario"
}

const tabs = [
  { name: 'Mi Cuenta', href: '/dashboard/profile/settings', icon: <User size={24} weight="duotone" /> },
  { name: 'Cambiar Password', href: '/dashboard/profile/password', icon: <Fingerprint size={24} weight="duotone" /> },
]

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <TabsNavigation tabs={tabs} />

      {children}

      <Toaster
        position="top-right"
        duration={3000}
        richColors
      />
    </>
  );
}