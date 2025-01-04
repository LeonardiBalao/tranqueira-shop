import PanelLinks from "@/components/structure/panel-links";
import { auth } from "@/server/auth";
import { ROLE } from "@prisma/client";
import { Book, LayoutDashboard, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");

  const userLinks = [
    { href: "/painel", label: "Painel", icon: <LayoutDashboard size={16} /> },
    { href: "/painel/usuario", label: "Usuário", icon: <User size={16} /> },
  ];
  const adminLinks =
    session.user.role === ROLE.ADMIN
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
    <>
      <PanelLinks allLinks={allLinks} />
      {children}
    </>
  );
}
