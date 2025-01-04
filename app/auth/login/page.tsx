import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/painel");

  return (
    <>
      <main className="flex flex-col justify-center items-center h-min-screen">
        <LoginForm />
      </main>
    </>
  );
}
