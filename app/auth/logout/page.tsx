"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "next-auth/react";

export default function Logout() {
  const logout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };
  logout();
  return (
    <main className="my-auto mx-auto py-16 px-4">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </main>
  );
}
