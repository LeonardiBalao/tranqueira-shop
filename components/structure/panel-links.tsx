"use client";

import Link from "next/link";
import { JSX } from "react";

interface PanelLinksProps {
  allLinks: {
    href: string;
    label: string;
    icon: JSX.Element;
  }[];
}

export default function PanelLinks({ allLinks }: PanelLinksProps) {
  return (
    <nav>
      <ul className="flex gap-4 mt-4">
        {allLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex gap-2 items-center">
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
