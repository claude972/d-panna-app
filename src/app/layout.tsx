import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D-Panna — Un artisan de confiance chez vous en 30 min",
  description:
    "Plombier, électricien, serrurier… un artisan certifié et assuré chez vous en moins de 30 minutes. Devis gratuit, intervention 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0b1437",
              color: "#ffffff",
              border: "1.5px solid #1b2a55",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
