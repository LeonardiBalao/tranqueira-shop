"use client";

import logo from "@/public/logo.jpg";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center container">
      <div className="w-full mx-auto">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="rounded-full mx-auto"
        />
      </div>
    </nav>
  );
}
