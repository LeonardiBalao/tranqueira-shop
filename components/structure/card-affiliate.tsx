"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Circle } from "lucide-react";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";

interface CardAffiliateProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function CardAffiliate({ review }: CardAffiliateProps) {
  return (
    <div className="flex gap-2 items-center p-4 border rounded-lg my-4 shadow-lg justify-between">
      <div className="flex gap-2 items-center">
        <div className="w-[150px]">
          <AspectRatio ratio={1}>
            <Image
              src={review.imageSrc}
              alt={review.imageAlt}
              className="rounded-md object-cover"
              fill
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col justify-center w-full">
          <span className="font-bold text-xs flex-wrap flex">
            {review.name}
          </span>
          <div className="flex gap-2 items-center">
            <p className="text-xs">R$ {review.price}</p>
            <Circle fill="gray" size={7} />
            <p className="text-xs">Vendido via Shopee</p>
          </div>
          <Link className="flex md:hidden w-full" href={review.affiliateLink}>
            <Button className="w-full" size="sm">
              Ver produto
            </Button>
          </Link>
        </div>
      </div>
      <Link className="hidden md:flex" href={review.affiliateLink}>
        <Button size="lg">Ver produto</Button>
      </Link>
    </div>
  );
}
