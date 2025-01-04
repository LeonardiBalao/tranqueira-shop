"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Socials from "./socials";

interface CardProps {
  cardTitle: string;
  showSocials: boolean;
  description: string;
}

export default function AuthCard({
  cardTitle,
  showSocials,
  description,
}: CardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto my-auto border-none shadow-none">
      <CardHeader className="flex flex-col items-center gap-2">
        <CardTitle className="text-2xl">{cardTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Separator />
      </CardHeader>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <span className="mx-auto text-xs font-extrabold">
          {new Date().getFullYear()}
        </span>
      </CardFooter>
    </Card>
  );
}
