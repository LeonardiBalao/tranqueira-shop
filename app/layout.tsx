import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Montserrat as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tranqueira Shop",
  description:
    "Fazemos o trabalho duro de garimpar os melhores (e piores) produtos para você. Nossos reviews honestos e detalhados vão ajudar você a fazer compras mais inteligentes e evitar ciladas. Siga nossa página para recomendações confiáveis e dicas de compras!",
};

const fontSans = FontSans({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          {children}
        </ThemeProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
