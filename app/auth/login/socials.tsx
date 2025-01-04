"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useState } from "react";

export default function Socials() {
  const [loading, setLoading] = useState(false);

  if (!loading) {
    return (
      <Button
        variant={"default"}
        className="w-full flex gap-4"
        onClick={() => {
          setLoading(true);
          signIn("google", { redirect: true, callbackUrl: "/painel" });
        }}
      >
        <Chrome size={20} />
        Entrar com Google
      </Button>
    );
  }

  if (loading) {
    return (
      <Button
        variant={"outline"}
        className="w-full flex gap-4"
        onClick={() => {
          setLoading(true);
          signIn("google", { redirect: true, callbackUrl: "/painel" });
        }}
      >
        <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
        Entrando
      </Button>
    );
  }
}
