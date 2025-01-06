"use client";

import { Facebook, Instagram, User, Youtube } from "lucide-react";
import { Badge } from "../ui/badge";

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
        <Facebook fill="blue" size={21} />
        <Instagram fill="orange" size={21} />
        <Youtube fill="red" size={28} />
      </div>
    </div>
  );
}
