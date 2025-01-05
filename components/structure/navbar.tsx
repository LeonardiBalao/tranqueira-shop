"use client";

import logo from "@/public/logo.jpg";
import Image from "next/image";

// interface NavbarProps {
//   user: ExtendUser | undefined;
// }

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center container mt-4 fixed top-0">
      <div className="w-full mx-auto">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="rounded-full mx-auto border-4 border-primary"
        />
      </div>
      {/* <div className="flex justify-center my-4">
        {!user ? (
          <Drawer>
            <DrawerTrigger
              className={cn(buttonVariants({ variant: "secondary" }), "ml-2")}
            >
              Login
            </DrawerTrigger>
            <DrawerContent className="flex justify-center">
              <DrawerTitle className="hidden">Title</DrawerTitle>
              <AuthCard
                cardTitle="Bem-vindo"
                description="Clique para entrar, é rápido e fácil."
                showSocials
              />
            </DrawerContent>
          </Drawer>
        ) : (
          <div>
            <LoadingButton
              variant={"secondary"}
              href="/auth/logout"
              size={"sm"}
              text="Sair"
            />
          </div>
        )}
      </div> */}
    </nav>
  );
}
