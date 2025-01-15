"use client";

import { StarHalfIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";

interface RatingProps {
  review: ReviewWithPriceAndRatingAsString;
}

export default function Rating({ review }: RatingProps) {
  const fullStars = Math.floor(parseFloat(review.rating));
  const hasHalfStar = parseFloat(review.rating) % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex gap-1 items-center">
      <Badge className="flex gap-1 h-8">
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`full-${index}`} size={18} fill="yellow" />
          ))}
        {hasHalfStar && <StarHalfIcon size={18} fill="yellow" />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`empty-${index}`} size={18} />
          ))}
        {review.rating}
      </Badge>
      <Badge variant={"outline"} className="text-xs gap-1 h-8">
        {review.ordersAmount}+ vendas
      </Badge>
      <Badge variant={"outline"} className="text-xs gap-1 h-8">
        {review.reviewsAmount}+ avaliações
      </Badge>
    </div>
  );
}
