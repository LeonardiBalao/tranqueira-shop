import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Montserrat as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Book, LayoutDashboard, User } from "lucide-react";
import { auth } from "@/server/auth";
import { ROLE } from "@prisma/client";
import PanelLinks from "@/components/structure/panel-links";

export const metadata: Metadata = {
  title: "Tranqueira Shop",
  description:
    "Fazemos o trabalho duro de garimpar os melhores (e piores) produtos para você. Nossos reviews honestos e detalhados vão ajudar você a fazer compras mais inteligentes e evitar ciladas. Siga nossa página para recomendações confiáveis e dicas de compras!",
};

const fontSans = FontSans({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userLinks = [
    { href: "/", label: "Home", icon: <LayoutDashboard size={16} /> },
    { href: "/painel/usuario", label: "Usuário", icon: <User size={16} /> },
  ];
  const adminLinks =
    session?.user.role === ROLE.ADMIN
      ? [
          {
            href: "/painel/review",
            label: "Criar Review",
            icon: <Book size={16} />,
          },
        ]
      : [];

  const allLinks = [...userLinks, ...adminLinks];

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-svh w-full flex-col items-center justify-center",
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PanelLinks allLinks={allLinks} />
          {children}
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
