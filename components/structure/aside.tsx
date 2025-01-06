"use client";

import { cn } from "@/lib/utils";

interface AsideProps {
  className: string;
}

export default function Aside({ className }: AsideProps) {
  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <h2 className={cn("font-bold")}>Tendencias em Celular</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere
        tortor sodales erat pulvinar condimentum. Vivamus auctor facilisis
        purus, eu ultricies dui euismod eu.
      </p>
    </aside>
  );
}
