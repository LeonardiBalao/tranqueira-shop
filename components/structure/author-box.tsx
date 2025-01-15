"use client";

import { Facebook, Instagram, User, Youtube } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface AuthorBoxProps {
  review: ReviewWithPriceAndRatingAsString;
}

export function AuthorBox({ review }: AuthorBoxProps) {
  return (
    <div className="flex gap-8 items-center justify-around md:justify-between flex-wrap">
      <div className="flex gap-2">
        <User size={21} />
        <Badge variant={"outline"}>Redação T-Shop</Badge>
      </div>
      <time
        dateTime={new Date(review.createdAt).toLocaleDateString()}
        className="text-xs"
      >
        {new Date(review.createdAt).toLocaleDateString()}
      </time>
      <div className="flex gap-4 items-center">
        <Link href="https://www.facebook.com/shop.tranqueira" target="_blank">
          <Facebook fill="blue" size={21} />
        </Link>
        <Link href="https://www.instagram.com/tranqueira.shop" target="_blank">
          <Instagram fill="orange" size={21} />
        </Link>
        <Link href={"https://www.youtube.com/@tranqueira_shop"} target="_blank">
          <Youtube fill="red" size={28} />
        </Link>
      </div>
    </div>
  );
}
