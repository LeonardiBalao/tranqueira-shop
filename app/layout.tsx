import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tranqueira Shop",
  description:
    "Fazemos o trabalho duro de garimpar os melhores (e piores) produtos para você. Nossos reviews honestos e detalhados vão ajudar você a fazer compras mais inteligentes e evitar ciladas. Siga nossa página para recomendações confiáveis e dicas de compras!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen border border-red-500 flex flex-col items-center py-6 gap-4`}
      >
        {children}
      </body>
    </html>
  );
}
