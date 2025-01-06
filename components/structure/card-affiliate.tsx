"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Circle } from "lucide-react";
import Link from "next/link";

interface CardAffiliateProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function CardAffiliate({ review }: CardAffiliateProps) {
  return (
    <div className="flex gap-2 items-center p-4 border rounded-lg my-4 shadow-lg justify-between">
      <div className="flex gap-2">
        <Image
          src={review.imageSrc}
          alt={review.imageAlt}
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-center">
          <p className="font-bold text-xs">{review.name}</p>
          <div className="flex gap-2 items-center">
            <p className="text-xs">R$ {review.price}</p>
            <Circle fill="gray" size={7} />
            <p className="text-xs">Vendido via Shopee</p>
          </div>
        </div>
      </div>
      <Link href={review.affiliateLink}>
        <Button size="lg">Ver mais</Button>
      </Link>
    </div>
  );
}
