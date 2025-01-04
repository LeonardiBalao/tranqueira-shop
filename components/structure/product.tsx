"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";

interface ProductProps {
  title: string;
  imageAlt: string;
  imageUrl: string;
  description: string;
  content: string;
  footer: string;
}

export default function Product({
  title,
  imageAlt,
  imageUrl,
  description,
  content,
  footer,
}: ProductProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                className="rounded-xs object-cover"
                fill
              />
            </AspectRatio>
          </div>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <Button>{footer}</Button>
        </CardFooter>
      </Card>
    </>
  );
}
