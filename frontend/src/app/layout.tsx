import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trackear | Presupuestos y Gastos",
  description: "Administrador de gastos y presupuestos",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-green-50">
      <Head>
        <title>Trackear - Controla tus Finanzas</title>
        <meta name="description" content="Administra tus gastos, ingresos y presupuestos fácilmente con CashTrackr. Organiza tus finanzas de manera segura y eficiente." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="CashTrackr - Administra tus Finanzas" />
        <meta property="og:description" content="Plataforma intuitiva para el control de tus finanzas personales y empresariales." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview.png" /> {/* Ruta a una imagen de preview (ideal 1200x630) */}
      </Head>

      <body
        className={`${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
