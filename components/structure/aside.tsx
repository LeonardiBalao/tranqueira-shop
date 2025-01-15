"use client";

import { cn } from "@/lib/utils";

interface AsideProps {
  className: string;
}

export default function Aside({ className }: AsideProps) {
  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <h2 className={cn("font-bold")}>Nunca comprou na Shopee?</h2>
      <p>
        Comprar na Shopee é sinônimo de confiança e praticidade. A plataforma
        garante segurança nas transações e entrega rápida, priorizando a
        satisfação do cliente. 📦✨
      </p>
    </aside>
  );
}
